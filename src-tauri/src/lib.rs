use std::sync::Mutex;
use tauri::{AppHandle, Emitter, Manager};
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::Path;

#[derive(Default)]
struct OpenedUrls(Mutex<Vec<String>>);

#[derive(Serialize, Deserialize)]
struct FileData {
    name: String,
    content: String,
    size: u64,
    modified: u64,
}

#[tauri::command]
fn get_opened_files(app: AppHandle) -> Vec<String> {
    // Collect from std::env::args()
    let mut args: Vec<String> = std::env::args().skip(1).collect();
    
    // Collect from OpenedUrls state (macOS events)
    if let Some(state) = app.try_state::<OpenedUrls>() {
        if let Ok(urls) = state.0.lock() {
            for url in urls.iter() {
                let clean_url = url.replace("file://", "");
                if !args.contains(&clean_url) {
                    args.push(clean_url);
                }
            }
        }
    }
    args
}

#[tauri::command]
fn read_file_data(path: String) -> Result<FileData, String> {
    let p = Path::new(&path);
    if !p.exists() {
        return Err(format!("File does not exist: {}", path));
    }
    
    let name = p.file_name()
        .map(|n| n.to_string_lossy().to_string())
        .unwrap_or_else(|| "Untitled".to_string());
        
    let content = match fs::read_to_string(p) {
        Ok(c) => c,
        Err(_) => {
            // Try reading as bytes and converting lossy in case of non-utf8
            match fs::read(p) {
                Ok(bytes) => String::from_utf8_lossy(&bytes).to_string(),
                Err(e) => return Err(format!("Failed to read file: {}", e)),
            }
        }
    };
    
    let metadata = fs::metadata(p).map_err(|e| format!("Failed to read metadata: {}", e))?;
    let size = metadata.len();
    
    let modified = match metadata.modified() {
        Ok(time) => match time.duration_since(std::time::SystemTime::UNIX_EPOCH) {
            Ok(duration) => duration.as_millis() as u64,
            Err(_) => 0,
        },
        Err(_) => 0,
    };

    Ok(FileData {
        name,
        content,
        size,
        modified,
    })
}

#[tauri::command]
fn save_file_content(path: String, content: String) -> Result<(), String> {
    fs::write(&path, content).map_err(|e| format!("Failed to save file: {}", e))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let opened_urls = OpenedUrls(Mutex::new(vec![]));
    tauri::Builder::default()
        .manage(opened_urls)
        .invoke_handler(tauri::generate_handler![get_opened_files, read_file_data, save_file_content])
        .build(tauri::generate_context!())
        .expect("error while running tauri application")
        .run(|app, event| {
            #[cfg(any(target_os = "macos", target_os = "ios", target_os = "android"))]
            if let tauri::RunEvent::Opened { urls } = event {
                let clean_urls: Vec<String> = urls.iter().map(|u| u.to_string().replace("file://", "")).collect();
                if let Some(state) = app.try_state::<OpenedUrls>() {
                    if let Ok(mut urls_lock) = state.0.lock() {
                        urls_lock.extend(clean_urls.clone());
                    }
                }
                let _ = app.emit("opened-files", clean_urls);
            }
        });
}

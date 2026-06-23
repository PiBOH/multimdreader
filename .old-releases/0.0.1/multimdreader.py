import os
import webbrowser
import customtkinter as ctk
from tkinter import filedialog, messagebox
import markdown2
from tkinterweb import HtmlFrame

# Configurazione estetica (Tema scuro/chiaro automatico basato su Windows)
ctk.set_appearance_mode("System")
ctk.set_default_color_theme("blue")

class MarkdownVisualizer(ctk.CTk):
    def __init__(self):
        super().__init__()
        
        self.title("multimdreader")
        self.geometry("850x650")
        
        # Barra superiore dei comandi
        self.top_frame = ctk.CTkFrame(self, height=50)
        self.top_frame.pack(fill="x", side="top", padx=10, pady=5)
        
        # Pulsante unico per aprire i file
        self.btn_open = ctk.CTkButton(self.top_frame, text="Open a file", command=self.open_file)
        self.btn_open.pack(side="left", padx=10, pady=10)
        
        # Nome del file attualmente visualizzato
        self.lbl_filename = ctk.CTkLabel(self.top_frame, text="no files here", font=("Arial", 12, "italic"))
        self.lbl_filename.pack(side="left", padx=10, pady=10)
        
        # Area di visualizzazione del testo formattato
        self.html_frame = HtmlFrame(self)
        self.html_frame.pack(fill="both", expand=True, padx=10, pady=5)
        
        # Configura l'apertura dei link nel browser reale di Windows
        self.html_frame.on_link_click(self.open_link)
        
    def open_file(self):
        file_path = filedialog.askopenfilename(
            title="Select a Markdown file",
            filetypes=[("File Markdown", "*.md *.markdown *.txt"), ("Tutti i file", "*.*")]
        )
        
        if file_path:
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    md_content = f.read()
                
                # Converte il markdown attivando il supporto a tabelle, codice ed elenchi
                html_content = markdown2.markdown(
                    md_content, 
                    extras=["tables", "fenced-code-blocks", "break-on-newline", "cuddled-lists"]
                )
                
                # Stile grafico pulito per una lettura confortevole
                css_style = """
                <style>
                    body { font-family: 'Segoe UI', Helvetica, Arial, sans-serif; padding: 25px; line-height: 1.6; color: #24292e; background-color: #ffffff; }
                    h1, h2, h3 { border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; color: #1b1f23; }
                    code { background-color: rgba(27,31,35,0.05); padding: 0.2em 0.4em; border-radius: 3px; font-family: monospace; font-size: 85%; }
                    pre { background-color: #f6f8fa; padding: 16px; border-radius: 6px; overflow: auto; }
                    pre code { background-color: transparent; padding: 0; font-size: 100%; }
                    table { border-collapse: collapse; width: 100%; margin: 20px 0; }
                    th, td { border: 1px solid #dfe2e5; padding: 6px 13px; text-align: left; }
                    th { background-color: #f6f8fa; }
                    blockquote { border-left: 0.25em solid #dfe2e5; margin: 0; padding: 0 1em; color: #6a737d; }
                    a { color: #0366d6; text-decoration: none; }
                    a:hover { text-decoration: underline; }
                </style>
                """
                
                # Mostra il risultato a schermo
                self.html_frame.load_html(css_style + html_content)
                self.lbl_filename.configure(text=os.path.basename(file_path))
                
            except Exception as e:
                messagebox.showerror("Decoding error", f"Impossibile aprire il file:\n{str(e)}")

    def open_link(self, url):
        # Impedisce alla finestra interna di cambiare pagina e apre il link sul browser del PC
        webbrowser.open(url)
        return False 

if __name__ == "__main__":
    app = MarkdownVisualizer()
    app.mainloop()
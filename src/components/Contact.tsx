import { useState, useRef } from "react";
import { Mail, Send, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // ============================================================
    // 👇 REMPLACEZ CES 3 VALEURS PAR LES VÔTRES (Dashboard EmailJS)
    // ============================================================
    const SERVICE_ID = "service_ruo4b1u";   // Ex: service_m9p...
    const TEMPLATE_ID = "template_winqrwj"; // Ex: template_8x...
    const PUBLIC_KEY = "w4GaojgBlqmRsB3gl"; // Ex: w90_Jk... (Public Key dans Account)
    // ============================================================

    if (formRef.current) {
      emailjs
        .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
        .then(
          (result) => {
            // Succès
            setIsSubmitted(true);
            setIsLoading(false);
            toast({
              title: "Message envoyé !",
              description: "Je vous répondrai dans les plus brefs délais.",
            });

            // Reset du formulaire après 5 secondes
            setTimeout(() => {
              setFormData({ name: "", email: "", message: "" });
              setIsSubmitted(false);
            }, 5000);
          },
          (error) => {
            // Erreur
            setIsLoading(false);
            console.error(error);
            toast({
              variant: "destructive",
              title: "Erreur",
              description: "Une erreur est survenue. Vérifiez vos clés EmailJS.",
            });
          }
        );
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 network-grid opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold font-mono mb-4 text-center">
          <span className="text-primary text-glow">{">"}</span> Contact
        </h2>
        <div className="h-1 w-24 bg-primary mx-auto mb-12 rounded-full border-glow"></div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-terminal-bg border border-border border-glow rounded-lg overflow-hidden">
            {/* Terminal header */}
            <div className="bg-card border-b border-border px-4 py-3 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-secondary"></div>
              </div>
              <span className="font-mono text-xs text-muted-foreground ml-2">
                contact-terminal.sh
              </span>
            </div>

            {/* Terminal content */}
            <div className="p-6">
              <div className="mb-6">
                <p className="font-mono text-sm text-muted-foreground mb-2">
                  <span className="text-primary">admin@contact:~$</span> ./send_message.sh
                </p>
                <p className="font-mono text-sm text-secondary mb-4">
                  {">"} Initializing secure connection...
                </p>
              </div>

              {isSubmitted ? (
                <div className="py-12 text-center">
                  <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-4 animate-pulse-glow" />
                  <p className="font-mono text-lg text-secondary mb-2">
                    {">"} Message sent successfully!
                  </p>
                  <p className="font-mono text-sm text-muted-foreground">
                    Acknowledgement received from server.
                  </p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="font-mono text-sm text-muted-foreground block mb-2">
                      <span className="text-primary">{">"}</span> Nom:
                    </label>
                    <input
                      type="text"
                      name="user_name" 
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-muted border border-border rounded px-4 py-2 font-mono text-sm focus:border-primary focus:outline-none transition-colors"
                      placeholder="Votre nom"
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="font-mono text-sm text-muted-foreground block mb-2">
                      <span className="text-primary">{">"}</span> Email:
                    </label>
                    <input
                      type="email"
                      name="user_email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-muted border border-border rounded px-4 py-2 font-mono text-sm focus:border-primary focus:outline-none transition-colors"
                      placeholder="votre@email.com"
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="font-mono text-sm text-muted-foreground block mb-2">
                      <span className="text-primary">{">"}</span> Message:
                    </label>
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={6}
                      className="w-full bg-muted border border-border rounded px-4 py-2 font-mono text-sm focus:border-primary focus:outline-none transition-colors resize-none"
                      placeholder="Votre message..."
                      disabled={isLoading}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-6 py-3 bg-primary text-primary-foreground font-mono font-semibold rounded-lg hover:scale-105 transition-transform border-glow flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Transmission...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Envoyer le message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="font-mono text-sm text-muted-foreground mb-4">
              Ou contactez-moi directement :
            </p>
            <a
              href="mailto:r.leon@rt-iut.re"
              className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors"
            >
              <Mail size={20} />
              <span className="font-mono">r.leon@rt-iut.re</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
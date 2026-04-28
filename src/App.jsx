import { useState } from "react";
import { PopupModal } from "react-calendly";

export default function FormPage() {

  const initialForm = {
    prenom: "",
    nom: "",
    whatsapp: "",
    email: "",
    langue: "",
    profil: "",
    motivation: [],
    creneau: "",
    pays: "",
    codePromo: "",
  };
  const [form, setForm] = useState(initialForm);

  const [loading, setLoading] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  const [openCalendly, setOpenCalendly] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (value) => {
    setForm((prev) => ({
      ...prev,
      motivation: prev.motivation.includes(value)
        ? prev.motivation.filter((v) => v !== value)
        : [...prev.motivation, value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await fetch(
      "https://script.google.com/macros/s/AKfycbx9bIpLZKWSTJnUaHWDPEDQZ92x4gQQB2XPIJV_QRbgNhXnSFeYgiDt7j0B0Qbz6okTqA/exec",
      {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(form),
      }
    );

    setLoading(false);
    // setShowModal(true);
    setOpenCalendly(true);

    //CALENDLY
    window.Calendly.initPopupWidget({
      url: `https://calendly.com/obedchrisnelamoussou/echange`,
    });

    // reset form
    setForm(initialForm);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">

          <h1 className="text-2xl font-bold text-center text-gray-800">
            Commencez maintenant
          </h1>

          <p className="text-center text-gray-500 text-sm mb-6">
            Remplissez ce formulaire et nous vous contacterons.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Nom + prénom */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-2">
                  Prénom
                </label>
                <input
                  name="prenom"
                  value={form.prenom}
                  onChange={handleChange}
                  placeholder="Votre prénom"
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent outline-none transition-all text-gray-900 bg-white font-montserrat border-gray-300 focus:ring-teli-blue"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-2">
                Nom
                </label>
                <input
                  name="nom"
                  value={form.nom}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent outline-none transition-all text-gray-900 bg-white font-montserrat border-gray-300 focus:ring-teli-blue"
                  required
                />
              </div>
            </div>

            {/* WhatsApp */}
            
            <div className="w-full flex flex-col">
              <label className="text-sm text-gray-600 mb-2">
                Téléphone (WhatsApp)
              </label>
              <input
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                placeholder="+229 00 00 00 00"
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent outline-none transition-all text-gray-900 bg-white font-montserrat border-gray-300 focus:ring-teli-blue"
                required
              />
            </div>

            {/* Email */}
            <label className="text-sm text-gray-600 mb-2">
                E-mail
              </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="email@email.com"
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent outline-none transition-all text-gray-900 bg-white font-montserrat border-gray-300 focus:ring-teli-blue"
              required
            />

            {/* Langue */}
            <div className="w-full flex flex-col">
              <label className="text-sm text-gray-600 mb-2">
                Quelle langue souhaitez-vous apprendre ?
              </label>
              <select
                name="langue"
                value={form.langue}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent outline-none transition-all text-gray-900 bg-white font-montserrat border-gray-300 focus:ring-teli-blue"
                required
              >
                <option value="">Choisir une langue</option>
                <option>Fongbé</option>
                <option>Yoruba</option>
              </select>
            </div>

            {/* Profil */}
            <div>
              <label className="text-sm text-gray-600 mb-2">
                Profil
              </label>
              <select
                name="profil"
                value={form.profil}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent outline-none transition-all text-gray-900 bg-white font-montserrat border-gray-300 focus:ring-teli-blue"
                required
              >
                <option value="">Choisir profil</option>
                <option>Étudiant</option>
                <option>Professionnel</option>
              </select>
            </div>

            {/* Motivation */}
            <div>
              <label className="text-sm text-gray-600 mb-2">
                Motivation (plusieurs choix possibles)
              </label>

              <div className="space-y-2">
                {[
                  "Réappropriation culturelle",
                  "Expatriation",
                  "Opportunité professionnelle",
                  "Plaisir de découvrir",
                ].map((mot) => (
                  <label
                    key={mot}
                    className={`flex items-center gap-2 border rounded-lg p-2 cursor-pointer transition ${
                      form.motivation.includes(mot)
                        ? "bg-blue-50 border-blue-400"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={form.motivation.includes(mot)}
                      onChange={() => handleCheckbox(mot)}
                    />
                    {mot}
                  </label>
                ))}
              </div>
            </div>

            {/* Créneau + Pays */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-2">
                  Créneau de cours souhaité
                </label>
                <select
                  name="creneau"
                  value={form.creneau}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent outline-none transition-all text-gray-900 bg-white font-montserrat border-gray-300 focus:ring-teli-blue"
                  required
                >
                  <option value="">Créneau</option>
                  <option value="18h-19h">18h - 19h</option>
                  <option value="19h-20h">19h - 20h</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-2">
                  Pays de résidence
                </label>
                  <input
                    name="pays"
                    value={form.pays}
                    onChange={handleChange}
                    placeholder="Pays"
                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent outline-none transition-all text-gray-900 bg-white font-montserrat border-gray-300 focus:ring-teli-blue"
                    required
                  />
                </div>
              </div>

            {/* Code promo */}
            <input
              name="codePromo"
              value={form.codePromo}
              onChange={handleChange}
              placeholder="Code promo"
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent outline-none transition-all text-gray-900 bg-white font-montserrat border-gray-300 focus:ring-teli-blue"
            />

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-orange-400 to-purple-500 hover:opacity-90 transition"
            >
              {loading ? "Envoi..." : "Je commence mon apprentissage"}
            </button>
          </form>
        </div>
      </div>

      {/* MODAL */}
      <PopupModal
        url={`https://calendly.com/obedchrisnelamoussou/echange?name=${form.prenom}%20${form.nom}&email=${form.email}`}
        onModalClose={() => {setOpenCalendly(false); setForm(initialForm)}}
        open={openCalendly}
        rootElement={document.getElementById("root")}
      />
      {/* {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl text-center shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-2">
              ✅ Inscription envoyée
            </h2>
            <p className="text-gray-600 text-sm">
              Nous allons te contacter sur WhatsApp.
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Fermer
            </button>
          </div>
        </div>
      )} */}
    </>
  );
}
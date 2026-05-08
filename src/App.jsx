import { useState } from "react";
import { PopupModal } from "react-calendly";
import { supabase } from "./lib/supabase";
import Logo from "./assets/logo.png";

import { Eye, EyeOff } from "lucide-react"

export default function FormPage() {

  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

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
        // mode: "no-cors",
        body: JSON.stringify(form),
      }
    );

    // Enregistrer dans Supabase
    const { error } = await supabase
      .from("pre-inscription")
      .insert([
        {
          prenom: form.prenom,
          nom: form.nom,
          whatsapp: form.whatsapp,
          email: form.email,
          langue: form.langue,
          profil: form.profil,
          motivation: form.motivation,
          creneau: form.creneau,
          pays: form.pays,
          code_promo: form.codePromo,
        },
    ]);
    if (error) {
      console.error("Erreur Supabase :", error);
      alert(error.message);
      setLoading(false);
      return;
    }

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

      <section className="bg-blue-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
        {!showForgotPassword ? (
        <div className="w-full bg-white rounded-lg shadow md:mt-0 mt-7 sm:max-w-md">
          
          <div className="flex flex-col items-center justify-center mt-6">
            <div className="bg-gradient-to-t from-[#3872c0] to-[#009ead] shadow-[#3872c0] shadow-lg flex items-center justify-center rounded-[20px] w-[72px] h-[72px] mb-4">
              <img className="w-[48px] h-[48px]" src={Logo} alt="logo" />
            </div>
            <h1 className="text-xl font-bold leading-tight tracking-[5px] text-gray-900 md:text-2xl">
              TELI
            </h1>
            <p>
              Learn African Languages
            </p>
          </div>
            

          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <form className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">
                      Identifiant
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="votre@gmail.com"
                      className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-[#2864ec] focus:border-[#2864ec] block w-full p-2.5 " 
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="bg-gray-50 border text-gray-900 rounded-lg    focus:border-primary-600 block w-full p-2.5 "
                          
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        aria-label="Afficher ou masquer le mot de passe"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          name="rememberMe"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-1  focus:ring-primary-300 "
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label className="text-gray-500">
                          Se rappeler de moi
                        </label>
                      </div>
                    </div>
                    <a type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-sm font-medium text-[#3872C0] hover:underline hover:cursor-pointer">
                      Mot de passe oublié?
                    </a>
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      type="submit"
                      
                      className="w-full text-white bg-[#3872C0] hover:cursor-pointer focus:ring-1 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Connexion en cours..." : "Se connecter"}
                    </button>
                  </div>
                  <p className="text-center text-xs"><span className="text-[#3872c0] font-bold">TELI Learning </span> · Moodle 5.1</p>
                  
                </form>

            
          </div>
        </div> ) : (

        <div className="w-full bg-white rounded-lg shadow md:mt-0 mt-7 sm:max-w-md">
          
          <div className="flex flex-col items-center justify-center mt-6">
            <div className="bg-gradient-to-t from-[#3872c0] to-[#009ead] shadow-[#3872c0] shadow-lg flex items-center justify-center rounded-[20px] w-[72px] h-[72px] mb-4">
              <img className="w-[48px] h-[48px]" src={Logo} alt="logo" />
            </div>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Mot de passe oublié
            </h1>
            <p className="text-[13px] text-center max-w-80">
              Saisissez votre identifiant et nous vous enverrons un lien de réinitialisation.
            </p>
          </div>
            
          {/* Mot de passe oublié */}
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <form className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">
                      Identifiant
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="votre@gmail.com"
                      className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-[#2864ec] focus:border-[#2864ec] block w-full p-2.5 " 
                    />
                  </div>

                  <div className="flex flex-col items-center justify-center space-y-4">
                    <button
                      type="submit"
                      
                      className="w-full text-white bg-[#009EAD] hover:cursor-pointer focus:ring-1 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Envoyer le lien
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(false)}
                      className="w-full border hover:cursor-pointer focus:ring-1 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Retour à la connexion
                    </button>
                  </div>
                  
                  
                </form>

            
          </div>
        </div> ) }
      </div>
    </section>
    </>
  );
}
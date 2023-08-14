<template>
  <footer class="container">
    <div class="footer_items">
      <div class="footer_icons">
        <a :href="link_facebook" target="_blank">
          <font-awesome-icon class="icon" icon="fa-brands fa-facebook-f" />
        </a>
        <a :href="link_instagram" target="_blank">
          <font-awesome-icon class="icon" icon="fa-brands fa-instagram" />
        </a>
        <a :href="link_twitter" target="_blank">
          <font-awesome-icon class="icon" icon="fa-brands fa-twitter" />
        </a>
        <a :href="link_youtube" target="_blank">
          <font-awesome-icon class="icon" icon="fa-brands fa-youtube" />
        </a>
      </div>
      <div class="footer_links">
        <div class="footer_links_items">
          <li>
            <a :href="link_audio_desc">Audio descriptivo</a>
          </li>
          <li>
            <a :href="link_rel_inver">Relaciones con inversionistas</a>
          </li>
          <li>
            <a :href="link_avisos_legales">Avisos legales</a>
          </li>
        </div>
        <div class="footer_links_items">
          <li>
            <a :href="link_centro_ayuda">Centro de ayuda</a>
          </li>
          <li>
            <a :href="link_empleo">Empleo</a>
          </li>
          <li>
            <a :href="link_pref_cookies">Preferencias de cookies</a>
          </li>
        </div>
        <div class="footer_links_items">
          <li>
            <a :href="link_tarj_regalo">Tarjetas de regalo</a>
          </li>
          <li>
            <a :href="link_term_uso">Términos de uso</a>
          </li>
          <li>
            <a :href="link_info_corp">Información corporativa</a>
          </li>
        </div>
        <div class="footer_links_items">
          <li>
            <a :href="link_prensa">Prensa</a>
          </li>
          <li>
            <a :href="link_privacidad">Privacidad</a>
          </li>
          <li>
            <a :href="link_contactanos">Contáctanos</a>
          </li>
        </div>
      </div>
      <div class="cont_button">
        <button>
          <span>Código de servicio</span>
        </button>
      </div>
      <p>© 1997-2023 Netflix, Inc.</p>
    </div>
  </footer>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const link_facebook = ref("https://www.facebook.com/Netflixmx");
    const link_instagram = ref("https://www.instagram.com/NetflixLAT/");
    const link_twitter = ref("https://twitter.com/netflixLAT");
    const link_youtube = ref("https://www.youtube.com/channel/UC5ZiUaIJ2b5dYBYGf5iEUrA");
    const link_audio_desc = ref("https://www.netflix.com/browse/audio-description");
    const link_rel_inver = ref("https://ir.netflix.net/ir-overview/profile/default.aspx");
    const link_avisos_legales = ref("https://help.netflix.com/legal/notices");
    const link_centro_ayuda = ref("https://help.netflix.com/es/");
    const link_empleo = ref("https://jobs.netflix.com/");
    const link_pref_cookies = ref("https://help.netflix.com/legal/privacy#cookies");
    const link_tarj_regalo = ref("https://www.netflix.com/cl/redeem");
    const link_term_uso = ref("https://help.netflix.com/legal/termsofuse");
    const link_info_corp = ref("https://help.netflix.com/legal/corpinfo");
    const link_prensa = ref("https://media.netflix.com/es/");
    const link_privacidad = ref("https://help.netflix.com/legal/privacy");
    const link_contactanos = ref("https://help.netflix.com/es/contactus");

    return {
      link_facebook,
      link_instagram,
      link_twitter,
      link_youtube,
      link_audio_desc,
      link_rel_inver,
      link_avisos_legales,
      link_centro_ayuda,
      link_empleo,
      link_pref_cookies,
      link_tarj_regalo,
      link_term_uso,
      link_info_corp,
      link_prensa,
      link_privacidad,
      link_contactanos,
    };
  },
};
</script>

<style scoped>
.container {
  background-color: rgba(0, 0, 0, 0);
  padding: 0rem 0rem 2rem 0rem;
  display: flex;
  justify-content: center;
}

.footer_items {
  /* min-width permite que al reducirse el ancho de la ventana del navegador 
     el contenedor footer_links no se vaya haciendo mas pequeño */
  min-width: 51%;
}

.footer_icons {
  text-align: left;
}

.icon {
  color: #fff;
  padding: 0.3rem 0.9rem 0.3rem 0.9rem;
  font-size: 1.4rem;
}

.footer_links {
  display: flex;
}

.footer_links_items {
  width: 15rem;
  text-align: left;
}

li {
  list-style: none;
}

.footer_links_items a {
  text-decoration: none;
  font-size: 0.9rem;
  margin: 0.5rem;
  color: #7c7c7c;
  display: inline-block;
}

.footer_links_items a:hover {
  text-decoration: underline;
}

.cont_button {
  display: flex;
}

button {
  padding: 0.4rem;
  background-color: rgba(222, 11, 11, 0);
  border-style: none;
  border: 1px solid #7c7c7c;
  cursor: pointer;
  margin-top: 1rem;
}

button:hover span {
  color: #fff;
}

span {
  color: #7c7c7c;
}

p {
  text-align: left;
  font-size: 0.7rem;
  cursor: default;
  margin-top: 1rem;
  color: #7c7c7c;
}

@media (min-width: 300px) and (max-width: 828px) {
  .footer_links {
    /* no es necesario que tenga la propiedad display: flex; ya que el .footer_links inicial lo tiene */
    flex-wrap: wrap;
  }

  .footer_links_items {
    /* al llegar a X tamaño cada item ocupara el 50% de su contenedor, lo que quiere decir que como eran 4 divs
       originalmente con este cambio serian 2 divs */
    flex-basis: 50%;
  }
}
</style>
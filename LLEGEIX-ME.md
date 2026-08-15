# Entrenament Roger · Mesocicle 1 · v2.0

Aquesta carpeta és la versió publicable de l'app d'en Roger. No cal instal·lar Node, React ni cap dependència: els fitxers ja estan compilats.

## Fitxers

- `index.html` — entrada de la web app.
- `app.js` — aplicació compilada.
- `manifest.webmanifest` — configuració de la PWA.
- `sw.js` — funcionament offline i actualització de la caché.
- `icon-*.png` — icones d'instal·lació.
- `robots.txt` — demana als cercadors que no indexin la web.
- `VALIDACIO-v2.0.txt` — resum de l'auditoria abans de publicar.

## Publicació a GitHub Pages

1. Descomprimeix el ZIP.
2. Puja **els fitxers de dins** a l'arrel del repositori; `index.html` ha de quedar directament a l'arrel.
3. A GitHub: `Settings` → `Pages` → `Deploy from a branch` → `main` → `/(root)`.
4. Obre la URL publicada i comprova que a Configuració apareix **v2.0**.

No pengis el ZIP com un únic fitxer: GitHub Pages no el descomprimeix.

## Instal·lació a l'iPhone

La ruta més fiable és:

1. Obrir la URL publicada amb Safari.
2. Compartir → `Afegeix a la pantalla d'inici`.
3. Obrir `Pla Roger` des de la icona.

La primera obertura necessita connexió perquè el dispositiu descarregui l'app. Després, els fitxers essencials queden disponibles offline.

## Dades i còpies de seguretat

El registre d'entrenament es desa localment al dispositiu. No hi ha cap servidor ni base de dades remota en aquesta versió.

- Si s'esborren les dades del navegador o es canvia de dispositiu, el registre local es pot perdre.
- L'app permet **Guarda una còpia del progrés** i **Restaura una còpia**.
- El JSON de còpia conté dades d'entrenament i autoregistre: s'ha de tractar com un fitxer privat.
- L'informe per a l'entrenador es pot copiar, descarregar o imprimir/desar en PDF.

Recomanació operativa: fer una còpia al final de cada setmana i una altra abans de tancar el mesocicle.

## Privacitat de la URL

`noindex` i `robots.txt` redueixen la probabilitat que la pàgina aparegui als cercadors, però **no són un sistema d'autenticació**. Qualsevol persona que conegui una URL pública pot intentar obrir-la.

Per al pilot, el codi publicable s'ha minimitzat perquè no contingui telèfon, correu ni detall clínic innecessari del qüestionari. El registre real de sessions queda al dispositiu fins que l'usuari decideix exportar-lo.

Abans d'utilitzar aquest sistema comercialment a escala, convé separar clarament la web pública del sistema de dades/seguiment que requereixi control d'accés.

## Equipament i prescripció

La v2.0 s'ha contrastat amb el qüestionari d'en Roger. Els exercicis obligatoris depenen de material que ha declarat disponible a casa. Les variants que requereixen un element no confirmat queden com a alternatives condicionades, no com a exercicis obligatoris.

S'ha respectat la seva petició de no fer pes mort. El bloc cardiovascular és una reentrada progressiva cap al seu objectiu futur de córrer 5 km, no una prescripció immediata de 5 km tres vegades per setmana.

## Actualitzacions

`sw.js` utilitza una caché versionada i estratègia de xarxa-primer. Quan hi ha connexió intenta servir la versió publicada més recent; si no n'hi ha, utilitza la còpia local.

En futures versions, canvia sempre el nom de `CACHE` del service worker abans de publicar.

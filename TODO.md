# 📋 TODO List – JobNest Project

- [X] Lorsqu’on crée un compte, être connecté directement après (là on crée mais on doit cliquer sur login pour se connecter)
- [ ] Pouvoir créer/éditer des jobs experiences dans applicant profile
- [x] Lorsqu’on est pas connecté en tant que applicant et qu’on clique sur Apply, on est redirigé vers le login de applicant, mais lorsqu’on se log on est redirigé vers home alors : 
- faire en sorte d’être redirigé vers l’offre où on était
- inclure aussi le cas où l’utilisateur **crée un compte** depuis cette page : après inscription, il doit également être redirigé vers la fiche de l’offre qu’il consultait.

- [ ] Faire les flèches retours un peu partout
- [ ] Améliorer le Swagger
- [ ] Améliorer les données en BDD pour plus de cohérence :
  - [ ] 20 jobs
  - [ ] 5 companies (chacune 4 jobs)
  - [ ] 3 applicants avec chacun 1 job experience
  - [ ] Pas de applications (on fera ça devant le prof pour un fresh start)

- [x] Pouvoir cliquer sur l’entreprise liée au job et voir une page d’infos sur elle (Name, Industry, Number)
- [x] Afficher l’entreprise liée au job dans le job-list et job-detail

- [x] On a pas le sweet alert dans ces formulaires :
  - [x] Apply (ajouter une alerte rouge lorsqu’on submit sans cover letter)
  - [x] Applicant profile (se met pas en rouge lorsqu’on edit des trucs faux/vides)
  - [x] Company profile (se met pas en rouge lorsqu’on edit des trucs faux/vides)

- [X] Mettre le footer partout et pas juste à home
- [ ] Protéger les pages sensibles avec des fichiers `.guard.ts` (ex: `/my-postings`, `/profile`, etc.)

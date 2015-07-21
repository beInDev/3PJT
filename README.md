##Setting up Gabbler.##
Le projet Gabbler utilise la technologie montante de webdevelopment Meteor,
disponible gratuitement et fonctionnant de manière officielle sur Linux et Windows.
L’installateur ne devrait susciter aucun problème sur ces deux systèmes, et ne nécessite aucun
autre effort : la commande ```meteor``` doit, après installation, être directement disponible.
Le projet en lui-même peut être décompressé à n’importe quel endroit, et, à partir du
répertoire nouvellement créé, entrer simplement ```meteor``` dans la console permet à Meteor de
trouver immédiatement ses repères, pour enfin rendre le projet entièrement disponible sur
http://localhost:3000.

Nous utilisons dans ce projet quelques packages qui ne sont pas natifs mais qui
devraient néanmoins s’installer depuis le projet. Dans le cas où vous rencontreriez des
problèmes lors de l’installation automatique de ces packages ```meteor list``` devrait
retourner, au minimum, les packages suivants :
- Accounts-base (1.2.0)
- Accounts-password (1.1.1)
- Autopublish (1.0.3)
- Iron:router (1.0.9)
- jQuery (1.11.3_2)
- meteor-platform (1.2.2)
- mrt:moment (2.8.1)

S’il venait à manquer certains de ces packages, vous pouvez essayer de les installer
manuellement via la commande ```meteor add [packagename]```
Accessoirement, la base de données Mongo peut être accédée (en local) via la
commande ```meteor mongo```

C’est tout ce dont nous avons besoin !

-- phpMyAdmin SQL Dump
-- version 4.2.12deb2+deb8u2
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Jeu 05 Avril 2018 à 16:53
-- Version du serveur :  5.5.58-0+deb8u1
-- Version de PHP :  5.6.33-0+deb8u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `HAMISSI_NGUYEN_DB`
--

-- --------------------------------------------------------

--
-- Structure de la table `FRIENDS`
--

CREATE TABLE IF NOT EXISTS `FRIENDS` (
  `source` int(11) NOT NULL,
  `cible` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `FRIENDS`
--

INSERT INTO `FRIENDS` (`source`, `cible`, `timestamp`) VALUES
(2, 9, '2018-04-05 14:15:24'),
(2, 10, '2018-04-05 14:15:27'),
(10, 9, '2018-04-05 14:14:59');

-- --------------------------------------------------------

--
-- Structure de la table `SESSIONS`
--

CREATE TABLE IF NOT EXISTS `SESSIONS` (
  `key_user` varchar(32) NOT NULL,
  `idUser` int(11) NOT NULL,
  `connect` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `SESSIONS`
--

INSERT INTO `SESSIONS` (`key_user`, `idUser`, `connect`) VALUES
('226647490', 2, 1),
('244518758', 1, 1),
('278075632', 10, 1),
('414874241', 3, 1),
('471530534', 2, 1),
('69451144', 10, 1),
('70740544', 10, 1),
('761633452', 2, 1),
('805059158', 2, 1),
('838262057', 9, 1),
('858454233', 2, 1),
('915524976', 10, 1);

-- --------------------------------------------------------

--
-- Structure de la table `USERS`
--

CREATE TABLE IF NOT EXISTS `USERS` (
`id` int(11) NOT NULL,
  `login` varchar(32) NOT NULL,
  `password` blob NOT NULL,
  `prenom` varchar(32) NOT NULL,
  `nom` varchar(32) NOT NULL,
  `email` varchar(32) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `USERS`
--

INSERT INTO `USERS` (`id`, `login`, `password`, `prenom`, `nom`, `email`) VALUES
(1, 'chrisg', 0x2a36344235323933373143453337453630314532364434394235464434304238434141463238413446, 'Christian', 'Mm', 'christian.mm@lip6.fr'),
(2, 'hugowyb', 0x2a33303436323432344145353144393441374238353141373744393938343330363746424438374632, 'Hugo', 'Wyborska', 'hugo.wyborska@lip6.fr'),
(3, 'jerryw', 0x2a34333137333234414146344139413734314644383845394436424132324441383734453930363944, 'JerryTomCharlie', 'Wednesday', 'jerry.wednesday@lip6.fr'),
(7, 'colonelBlotto', 0x2a34354231373041314335324244393433313945333332373546363744453032393830394238333045, 'Colonel', 'Blotto', 'cblotto@lip6.fr'),
(9, 'nguyenfati', 0x2a30343932314641303131454633313442464431423434393034453544314234373130393235353131, 'Fatemeh', 'Nguyen', 'fatemeh.hamissi@lip6.fr'),
(10, 'laurahamissi', 0x2a37313834413445373146413935333344304536463338324145364331413135313138423134413535, 'Laura', 'Hamissi', 'laura.hamissi@lip6.fr'),
(11, 'javad26', 0x2a34343241363244453730324132434432314135443842343738364438363536313234383632333445, 'Javad', 'Ezati', 'javad.ezati@lip6.fr');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `FRIENDS`
--
ALTER TABLE `FRIENDS`
 ADD PRIMARY KEY (`source`,`cible`), ADD KEY `cible` (`cible`);

--
-- Index pour la table `SESSIONS`
--
ALTER TABLE `SESSIONS`
 ADD PRIMARY KEY (`key_user`), ADD UNIQUE KEY `indexSessions` (`key_user`,`idUser`,`connect`), ADD KEY `idUser` (`idUser`);

--
-- Index pour la table `USERS`
--
ALTER TABLE `USERS`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `login` (`login`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `USERS`
--
ALTER TABLE `USERS`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `FRIENDS`
--
ALTER TABLE `FRIENDS`
ADD CONSTRAINT `FRIENDS_ibfk_2` FOREIGN KEY (`cible`) REFERENCES `USERS` (`id`),
ADD CONSTRAINT `FRIENDS_ibfk_1` FOREIGN KEY (`source`) REFERENCES `USERS` (`id`);

--
-- Contraintes pour la table `SESSIONS`
--
ALTER TABLE `SESSIONS`
ADD CONSTRAINT `SESSIONS_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `USERS` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

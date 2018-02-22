-- phpMyAdmin SQL Dump
-- version 4.2.12deb2+deb8u2
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Mer 21 Février 2018 à 17:27
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

-- --------------------------------------------------------

--
-- Structure de la table `SESSIONS`
--

CREATE TABLE IF NOT EXISTS `SESSIONS` (
  `key` varchar(32) NOT NULL,
  `idUser` int(11) NOT NULL,
  `connect` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `USERS`
--

CREATE TABLE IF NOT EXISTS `USERS` (
`id` int(11) NOT NULL,
  `login` varchar(32) NOT NULL,
  `password` blob NOT NULL,
  `prenom` varchar(32) NOT NULL,
  `nom` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
 ADD PRIMARY KEY (`key`), ADD UNIQUE KEY `indexSessions` (`key`,`idUser`,`connect`), ADD KEY `idUser` (`idUser`);

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
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
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

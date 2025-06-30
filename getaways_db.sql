-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-01-2024 a las 15:57:26
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bz5rcefayjff6z8fpwfn`
--
CREATE DATABASE IF NOT EXISTS `bz5rcefayjff6z8fpwfn` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `bz5rcefayjff6z8fpwfn`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `coordenada`
--

CREATE TABLE `coordenada` (
  `id` int(11) NOT NULL,
  `id_ruta` int(11) NOT NULL,
  `lat` decimal(10,8) NOT NULL,
  `lon` decimal(11,8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `coordenada`
--

INSERT INTO `coordenada` (`id`, `id_ruta`, `lat`, `lon`) VALUES
(1, 5, '36.76457712', '-5.43573419'),
(6, 3, '36.76567726', '-6.31740558'),
(7, 4, '36.61420959', '-5.69854062'),
(8, 6, '36.57233295', '-6.21623396'),
(9, 7, '37.13669849', '-4.79908176'),
(10, 8, '36.80862490', '-5.39206133'),
(11, 9, '36.52859004', '-5.58609778'),
(12, 18, '37.95585834', '-5.62469365'),
(24, 43, '37.99763373', '-2.83732303'),
(25, 44, '37.91219553', '-3.00330290'),
(26, 45, '37.46527155', '-4.33820125'),
(27, 46, '37.88435438', '-5.31120553'),
(28, 47, '37.32563540', '-6.24881027'),
(29, 48, '37.12995115', '-3.52329789'),
(30, 49, '36.75128088', '-2.11201433'),
(31, 50, '36.75881512', '-5.45545838'),
(32, 51, '36.70632091', '-5.42757070'),
(33, 52, '36.73515986', '-5.43116560'),
(34, 53, '37.46501416', '-4.35110052');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lista_revisar`
--

CREATE TABLE `lista_revisar` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `elemento` varchar(128) NOT NULL,
  `marcado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `lista_revisar`
--

INSERT INTO `lista_revisar` (`id`, `id_usuario`, `elemento`, `marcado`) VALUES
(4, 6, 'Cámara GoPro', 0),
(5, 6, 'Trípode GoPro', 0),
(6, 6, 'Baterías GoPro', 0),
(7, 6, 'Agua', 0),
(8, 6, 'Zumo', 0),
(10, 5, 'Comida', 0),
(13, 6, 'Comida', 0),
(14, 6, 'Batería externa', 0),
(16, 5, 'Bikini', 0),
(17, 11, 'Comida', 0),
(18, 11, 'Zapatos cómodos', 0),
(19, 5, 'Crema solar', 0),
(20, 6, 'Ibuprofeno', 0),
(34, 18, 'Comida', 0),
(35, 6, 'Kit primeros auxilios', 0),
(41, 37, 'Crema solar', 0),
(42, 37, 'Comida', 0),
(43, 37, 'Bebida', 0),
(44, 37, 'Zapatos cómodos', 0),
(45, 37, 'Kit primeros auxilios', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `provincia`
--

CREATE TABLE `provincia` (
  `id` int(11) NOT NULL,
  `nombre` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `provincia`
--

INSERT INTO `provincia` (`id`, `nombre`) VALUES
(1, 'Jaén'),
(2, 'Córdoba'),
(3, 'Sevilla'),
(4, 'Huelva'),
(5, 'Cádiz'),
(6, 'Málaga'),
(7, 'Granada'),
(8, 'Almería');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicacion`
--

CREATE TABLE `publicacion` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `titulo` varchar(128) NOT NULL,
  `descripcion` text NOT NULL,
  `publica` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `publicacion`
--

INSERT INTO `publicacion` (`id`, `id_usuario`, `titulo`, `descripcion`, `publica`) VALUES
(18, 5, 'Mis 3 rutas de senderismo favoritas', 'Como un amante de la naturaleza y los deportes al aire libre, he tenido la oportunidad de explorar muchas rutas de senderismo en diferentes partes del mundo. Pero de todas las rutas que he recorrido, hay tres que han dejado una impresión duradera en mí. Aquí te comparto mis rutas de senderismo favoritas:\n\nEl Camino de Santiago: Esta ruta de senderismo de más de 800 kilómetros a través de España es una experiencia única. Me encantó la combinación de paisajes, culturas y personas que conocí en el camino. Fue un reto físico y emocional, pero al llegar a la Catedral de Santiago de Compostela, sentí una gran satisfacción y logro.\n\nEl Cañón de Colca: Ubicado en Perú, este cañón es uno de los más profundos del mundo. La ruta de senderismo a través del cañón ofrece vistas impresionantes de los paisajes andinos y la posibilidad de ver cóndores en su hábitat natural. La caminata puede ser desafiante debido a la altitud y el clima, pero la recompensa es inolvidable.\n\nLa Ruta de los Cien Lagos: En el Parque Nacional de los Lagos de Plitvice en Croacia, esta ruta de senderismo es un verdadero paraíso natural. La ruta lleva a través de senderos de madera y puentes sobre cristalinas aguas azules y verdes. Es una experiencia mágica en la que la naturaleza se convierte en una obra de arte.\n\nEstas son mis tres rutas de senderismo favoritas. ¿Cuáles son las tuyas? ¡Comparte tus experiencias y recomendaciones con la comunidad de amantes de la naturaleza en esta aplicación de rutas de senderismo!', 1),
(20, 6, 'Mis 3 rutas de senderismo favoritas en Andalucía', 'Andalucía es una región llena de contrastes y diversidad de paisajes. Si eres un amante de las rutas de senderismo, aquí te comparto mis tres rutas favoritas en esta hermosa región del sur de España:\n\nLa Garganta Verde: Esta ruta de senderismo en la Sierra de Grazalema es una de las más impresionantes de Andalucía. A lo largo del camino, podrás admirar la belleza del cañón de la Garganta Verde, con sus paredes verticales de más de 400 metros de altura. También podrás observar la fauna y flora autóctonas de la zona, incluyendo buitres leonados y una gran variedad de plantas endémicas.\n\nEl Torcal de Antequera: En el corazón de la provincia de Málaga se encuentra este espectacular paraje natural, declarado Patrimonio Mundial por la UNESCO. La ruta de senderismo en el Torcal de Antequera te llevará a través de un paisaje kárstico con formaciones rocosas de formas caprichosas, conocidas como \"ciudad de piedra\". Es un lugar único en el mundo y una experiencia que no te puedes perder.\n\nLa Alpujarra: Esta comarca situada en la vertiente sur de Sierra Nevada es un auténtico paraíso para los amantes del senderismo. La ruta de senderismo de La Alpujarra te llevará a través de una serie de pequeños pueblos con una arquitectura típica de la zona, rodeados de una impresionante naturaleza. Durante la caminata, podrás disfrutar de vistas panorámicas del valle del río Guadalfeo y de las cumbres nevadas de Sierra Nevada.\n\nEstas son mis tres rutas de senderismo favoritas en Andalucía. Si eres un amante de la naturaleza y te gusta practicar senderismo, no dudes en explorar estas maravillosas rutas. ¿Tienes alguna recomendación? ¡Comparte tus experiencias con la comunidad de senderistas en nuestra aplicación!', 1),
(21, 5, 'La Pedriza: mi experiencia en una ruta de senderismo en la Sierra de Guadarrama', '¡Hola a todos! Hoy quiero compartir mi experiencia en mi última aventura en la naturaleza. Decidí hacer una ruta de senderismo en la Sierra de Guadarrama, cerca de Madrid, y tengo que decir que ha sido una de las mejores experiencias que he tenido en mucho tiempo.\n\nLa ruta que hice se llamaba La Pedriza, y aunque fue un poco desafiante, las vistas panorámicas que se pueden apreciar durante el recorrido hacen que todo valga la pena. Pasé por arroyos de agua cristalina, campos de flores silvestres, y algunas zonas boscosas que parecían sacadas de un cuento de hadas.\n\nAdemás de la belleza natural, me encantó la sensación de desconexión total que tuve durante la ruta. El aire fresco de la montaña, la tranquilidad del bosque y el sonido de los pájaros me hicieron sentir completamente alejado de la ciudad y el estrés diario.\n\nSi eres un amante de la naturaleza, definitivamente tienes que hacer una ruta de senderismo en la Sierra de Guadarrama. Hay muchas rutas diferentes para elegir, cada una con su propia belleza y desafío. ¡No te arrepentirás!', 1),
(22, 6, 'Descubre la belleza natural de Andalucía: Tres rutas de senderismo imprescindibles', '¡Hola amantes del senderismo! Si eres de Andalucía o estás planeando visitar esta hermosa región de España, te tengo algunas sugerencias de rutas de senderismo que debes explorar.\n\nLa primera ruta que te recomiendo es \"El Torcal de Antequera\" en la provincia de Málaga. Esta impresionante formación rocosa es un verdadero espectáculo natural y es uno de los lugares más emblemáticos de la región. La ruta ofrece vistas panorámicas espectaculares, formaciones rocosas únicas y la oportunidad de ver la flora y fauna local en su hábitat natural.\n\nLa segunda ruta que te sugiero es \"El Caminito del Rey\" en la provincia de Málaga. Esta ruta es perfecta para los más aventureros, ya que se trata de un sendero que se encuentra a gran altura sobre el río Guadalhorce. La ruta ofrece vistas espectaculares de las montañas circundantes y del paisaje natural de Andalucía.\n\nPor último, te recomiendo la \"Ruta de los Cahorros\" en Granada. Esta ruta es ideal para aquellos que buscan un poco más de desafío, ya que incluye algunos tramos empinados y rocosos. A lo largo del camino, podrás ver cascadas, ríos y vistas panorámicas impresionantes de las montañas de Sierra Nevada.\n\nNo importa cuál de estas rutas de senderismo elijas, estoy seguro de que te encantará explorar la belleza natural de Andalucía. Así que ponte las botas de senderismo y ¡a disfrutar de la naturaleza!', 1),
(60, 18, 'Descubre las mejores rutas de senderismo en la Sierra de Guadarrama', 'La Sierra de Guadarrama es un destino perfecto para los amantes del senderismo. Con su impresionante paisaje natural, esta zona de montañas en el centro de España ofrece una gran variedad de rutas para explorar y disfrutar al aire libre. Si estás buscando un lugar para escapar de la ciudad y conectar con la naturaleza, estas son algunas de las mejores rutas de senderismo que puedes encontrar en la Sierra de Guadarrama:\n\n - La Pedriza: Esta ruta de dificultad media-alta es perfecta para aquellos que buscan un desafío. Con sus rocas y acantilados, La Pedriza ofrece unas vistas espectaculares y es uno de los lugares más populares de la Sierra de Guadarrama.\n\n - Puerto de Navacerrada: Si estás buscando una ruta más fácil pero igualmente impresionante, el Puerto de Navacerrada es una buena opción. Con su cumbre a 1.858 metros de altura, esta ruta ofrece vistas impresionantes de la Sierra de Guadarrama y sus alrededores.\n\n - La Laguna de los Pájaros: Esta ruta circular es una de las más populares de la zona y es perfecta para toda la familia. Con una distancia de unos 6 kilómetros, esta ruta te llevará a través de bosques y praderas hasta llegar a la impresionante Laguna de los Pájaros.\n\n - Cuerda Larga: Esta ruta de dificultad alta es perfecta para aquellos que buscan un verdadero desafío. Con su cumbre a 2.273 metros de altura, la Cuerda Larga ofrece unas vistas impresionantes de la Sierra de Guadarrama y sus alrededores.\n\n - Siete Picos: Esta ruta de dificultad media-alta es una de las más populares de la Sierra de Guadarrama. Con su cumbre a 2.138 metros de altura, esta ruta ofrece vistas impresionantes de las montañas y los valles circundantes.\n\nEstas son solo algunas de las rutas de senderismo que puedes encontrar en la Sierra de Guadarrama. Ya sea que busques un desafío o simplemente quieras disfrutar de un paseo tranquilo por la naturaleza, esta zona de montañas en el centro de España es el lugar perfecto para desconectar y disfrutar de la belleza natural. ¡No te lo pierdas!', 1),
(61, 11, 'Explora la impresionante Sierra de Cádiz a través de estas rutas de senderismo', 'La Sierra de Cádiz es una zona montañosa en el sur de España que ofrece algunos de los paisajes naturales más impresionantes de la región. Si eres un amante del senderismo y estás buscando un lugar para explorar, aquí te dejamos algunas de las mejores rutas de senderismo que puedes encontrar en la Sierra de Cádiz:\n\n1. Ruta del Pinsapar: Esta ruta de dificultad media-alta te llevará a través de un bosque de pinsapos, una especie de abeto que solo crece en esta zona del mundo. Durante la caminata, podrás disfrutar de impresionantes vistas panorámicas de los alrededores y llegar hasta el punto más alto de la Sierra de Grazalema.\n\n2. Ruta del Salto del Cabrero: Esta ruta circular de dificultad media te llevará a través de un impresionante paisaje natural y la oportunidad de ver la cascada del Salto del Cabrero. También podrás disfrutar de las vistas panorámicas de la ciudad de Ubrique y su entorno.\n\n3. Ruta de los Algarrobales: Esta ruta de dificultad media-baja es perfecta para aquellos que buscan una caminata más relajada a través de bosques de algarrobos, alcornoques y castaños. La ruta es circular y te llevará a través de hermosos paisajes naturales, pasando por pequeños pueblos y áreas de cultivo.\n\n4. Ruta del Bosque: Esta ruta circular de dificultad media te llevará a través de un bosque mixto de alcornoques, quejigos y acebuches. Durante la caminata, podrás disfrutar de vistas panorámicas del pueblo de Grazalema y los picos circundantes.\n\n5. Ruta de los Pueblos Blancos: Esta ruta circular de dificultad media-baja te llevará a través de los pintorescos pueblos blancos de la Sierra de Cádiz, pasando por pequeñas aldeas y vistas panorámicas de la región. Es una caminata perfecta para aquellos que buscan combinar la naturaleza con la cultura y la historia.\n\nEstas son solo algunas de las rutas de senderismo que puedes encontrar en la Sierra de Cádiz. Ya sea que busques un desafío o simplemente quieras disfrutar de un paseo tranquilo por la naturaleza, esta zona de montañas en el sur de España es el lugar perfecto para desconectar y disfrutar de la belleza natural. ¡No te lo pierdas!', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ruta_completada`
--

CREATE TABLE `ruta_completada` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_ruta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ruta_completada`
--

INSERT INTO `ruta_completada` (`id`, `id_usuario`, `id_ruta`) VALUES
(17, 5, 6),
(20, 11, 3),
(21, 11, 4),
(22, 11, 6),
(37, 6, 6),
(41, 6, 5),
(44, 6, 9),
(45, 37, 18),
(46, 37, 6),
(47, 37, 8),
(48, 37, 3),
(59, 5, 5),
(64, 74, 9),
(65, 6, 48);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ruta_pendiente`
--

CREATE TABLE `ruta_pendiente` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_ruta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ruta_pendiente`
--

INSERT INTO `ruta_pendiente` (`id`, `id_usuario`, `id_ruta`) VALUES
(53, 6, 4),
(76, 6, 3),
(83, 6, 8),
(84, 6, 5),
(85, 6, 7),
(101, 6, 9),
(103, 37, 4),
(104, 37, 7),
(105, 37, 9),
(106, 37, 5),
(121, 5, 5),
(122, 5, 3),
(133, 74, 6),
(134, 74, 7),
(135, 74, 8),
(136, 74, 43),
(137, 11, 7),
(138, 11, 50),
(139, 11, 51);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ruta_senderismo`
--

CREATE TABLE `ruta_senderismo` (
  `id` int(11) NOT NULL,
  `id_provincia` int(11) NOT NULL,
  `nombre` varchar(64) NOT NULL,
  `descripcion` text NOT NULL,
  `imagen` varchar(128) NOT NULL,
  `longitud` float NOT NULL,
  `tipo` enum('Lineal','Circular','Semicircular') NOT NULL,
  `dificultad` enum('Fácil','Moderado','Difícil') NOT NULL,
  `permiso_necesario` tinyint(1) NOT NULL,
  `como_llegar` text NOT NULL,
  `enlace_maps` varchar(128) NOT NULL,
  `media_valoraciones` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ruta_senderismo`
--

INSERT INTO `ruta_senderismo` (`id`, `id_provincia`, `nombre`, `descripcion`, `imagen`, `longitud`, `tipo`, `dificultad`, `permiso_necesario`, `como_llegar`, `enlace_maps`, `media_valoraciones`) VALUES
(3, 5, 'Cerro del Águila', 'En la otra orilla del Guadalquivir, Doñana sigue siendo un espacio cargado de riquezas. Este sendero descubre parte de ellas, ofreciendo un recorrido por una zona en la que campean numerosas especies. La ruta permite asistir al encuentro entre los dominios del mar y la tierra, aquellos en las que la industria salinera ha prosperado; otear desde dunas fósiles las vistas del río y la otra orilla enfrente; y apreciar las sutilezas de una vegetación que tiñe de matices verdes este itinerario. Especial relevancia posee la laguna de Tarelo por ser refugio de muchas aves, entre las que es posible observar malvasías, porrones o somormujos junto con zampullines y fochas. En cuanto a vegetación, durante el itinerario tendremos la oportunidad de observar principalmente grandes pinos y sabinas.', 'https://sendacadiz.es/gallery/2-CERRO_DEL_AGUILA_9p2kwvls.jpg', 4.1, 'Circular', 'Fácil', 0, 'Desde Sanlúcar de Barrameda tomar la carretera secundaria CA-9027 en dirección a La Algaida. Esta carretera llega hasta la entrada del Pinar de Monte Algaida, donde comienza el sendero.', 'https://goo.gl/maps/HsMzZ5aA5kV732LC6', 2.67),
(4, 5, 'Garganta de Bogas', 'La ruta se sitúa en los Llanos del Valle, entre la Sierra de la Sal y la Sierra de las Cabras, uno de los relieves más importantes que se reconocen en las campiñas gaditanas.\r\n\r\nEstas sierras dibujan un arco muy pronunciado inmediatamente al Sur del embalse de Guadalcacín. La Garganta de Bogas se corresponde con un espectacular cañón kárstico que corta el arco que forman las sierras aledañas, drenando sus aguas hacia el embalse del Guadalcacín. Este corte transversal tuvo lugar en épocas pasadas por el arroyo que discurre por la garganta, al descender su nivel de base.', 'https://sendacadiz.es/gallery/022-1.jpg', 5.2, 'Lineal', 'Moderado', 0, 'Desde San José del Valle salir en dirección Alcalá de los Gazules por la carretera CA-5102. Pasado el punto kilométrico 8 tomar el camino de la izquierda, donde comienza el sendero.', 'https://goo.gl/maps/DBdgmMtp5hLk3ZGMA', 2),
(5, 5, 'El Torreón', 'Este sendero conduce al techo de la provincia gaditana, el pico más alto de la Sierra del Pinar. Formidable atalaya donde se puede contemplar una buena parte de Andalucía. Es un ascenso algo duro pero recompensa y se puede tomar aliento en la cumbre con inmejorables vistas.\r\n\r\nDurante el ascenso, es posible conocer formaciones geológicas características de terrenos calizos, pudiendo avistar rapaces y coloridos pajarillos, y con un poco se suerte, cabras montesas.\r\n\r\nConforme se gana altura, la vegetación es diferente. Esto se conoce como pisos de vegetación. Al acercarse a la cumbre, la vegetación desaparece quedando el roquedo al descubierto. En esta zona hay que extremar las precauciones, montones de piedras a modo de señal, marcan el camino y alguna marca de pintura para llegar a la cumbre.\r\n', 'https://sendacadiz.es/gallery/084-1.jpg', 3, 'Lineal', 'Fácil', 1, 'Desde Benamahoma tomar la A-372 hacia Grazalema. Tras recorrer unos 5 Km, el sendero se inicia en un camino a la izquierda.', 'https://goo.gl/maps/yYYeG6MQF786ciVm7', 3.5),
(6, 5, 'Los Toruños', 'Este sendero permite conocer las marismas mejor conservadas del Parque Natural Bahía de Cádiz. El río San Pedro lleva sus aguas hasta la playa de Levante. En su recorrido, alimenta con multitud de caños a estas marismas, en las que se puede comprobar como la conservación de la naturaleza no está, en absoluto, reñida con el uso público y disfrute de las poblaciones vecinas. Durante el recorrido se puede acceder a la playa de Levante, compuesta por una flecha litoral y el cordón de dunas.\r\n\r\nEn las marismas, las aguas dulces y saladas se mezclan, y las criaturas de unas y otras también. La productividad biológica en ellas es altísima. Constituyen, además, hábitat indispensables para la reproducción de numerosas aves y especies marítimas.', 'https://sendacadiz.es/gallery/151-1.jpg', 5.2, 'Lineal', 'Fácil', 0, 'En la urbanización de la playa de Valdelagrana (El Puerto de Santa María), tomar la avenida del Mar, hasta el centro de recepción de visitantes del Parque Metropolitano Marisma de los Toruños y Pinar de la Algaida, lugar de inicio del sendero.', 'https://goo.gl/maps/SWa764raq55qmnPx5', 1.67),
(7, 6, 'Caminito del Rey', 'El Caminito del Rey es una famosa ruta de senderismo situada en la provincia de Málaga, en el sur de España. La ruta es conocida por su impresionante paisaje y por la peligrosidad que presentaba antes de ser restaurada.\r\n\r\nLa ruta comienza en el embalse del Chorro y recorre un estrecho desfiladero en las paredes del cañón del río Guadalhorce. A lo largo de la ruta, los visitantes caminan por una pasarela estrecha y elevada que se extiende a lo largo de la pared del desfiladero y que ofrece vistas espectaculares de la naturaleza circundante.\r\n\r\nLa ruta original fue construida en el siglo XX para permitir a los trabajadores de una central hidroeléctrica acceder a ella, pero a lo largo de los años se convirtió en peligrosa debido a la falta de mantenimiento. En 2015 se llevó a cabo una restauración completa de la ruta, mejorando la seguridad y el acceso para los visitantes.', 'https://s2.wklcdn.com/image_21/658209/9204196/5464823Master.jpg', 8.19, 'Lineal', 'Fácil', 1, 'La ruta se encuentra a unos 60 kilómetros de Málaga, y se puede llegar por la carretera A-357 en dirección a Ardales. Una vez en Ardales, se debe seguir la señalización hacia la entrada del Caminito del Rey.', 'https://goo.gl/maps/5vrzFf9veDpAukLU6', 5),
(8, 5, 'Garganta Verde', 'La Garganta Verde esconde la cueva de la Ermita que, sin estar adscrita a ningún culto que no sea el de la propia naturaleza, resulta un espacio mágico. El arroyo Bocaleones ha construido este lugar con dimensiones de auténtico templo. El sendero permite acceder a esta gruta por un acusado descenso sobre el que planean buitres leonados que, desde sus nidos en pequeñas plataformas en las verticales paredes del cañón, se lanzan dibujando círculos en el aire. Esta colonia supone una de las más numerosas de Europa.\r\n\r\nLa Ermita llama la atención por las texturas y colores rosas y verdes que tiñen sus paredes, causados por unas algas que proliferan en su roca. La luz es tenue y los rayos directos del sol apenas tocan el lugar. El silencio sólo es roto por las gotas de agua que caen desde el techo de la enorme bóveda, y que construyen las estalactitas y estalagmitas que se pueden ver, en un proceso delicado y muy lento.\r\n', 'https://live.staticflickr.com/1980/31071604898_2f352762a5_b.jpg', 2.5, 'Lineal', 'Difícil', 1, 'Desde Zahara de la Sierra tomar la carretera CA-9104 hacia Grazalema. Después de haber recorrido unos 4 Km, el sendero se inicia a la derecha.', 'https://goo.gl/maps/JF4kcEtRejP2Zvc68', NULL),
(9, 6, 'La Sauceda', 'Este sendero está llenos de contrastes: desde el fondo de los arroyos a las crestas de la sierra del Aljibe, y de la umbría de los valles a los despejados roquedales, por los que campean numerosas rapaces.\r\n\r\nLa ruta comienza en el área recreativa de La Sauceda, atravesando un puentecito hasta una ermita en ruinas. Inmediatamente después se adentra en un bosque umbrío, donde son protagonistas la niebla y la sombra, que dan como resultado un bosque subtropical, la laurisilva. Se camina entre “canutos” y bosques en galería, con el sonido del agua de fondo. Están presentes grandes ejemplares de laureles, alcornoques y quejigos, tapizados de musgos y cubierto de helechos.\r\n\r\nA continuación, el sendero sigue por una pista forestal y tras pasar un salto de agua, comienza a ascender entre jaras y brezos.\r\n\r\nEl recorrido finaliza en el pico del Aljibe, desde el cual se puede disfrutar de las hermosas vistas del Parque Natural de Los Alcornocales.', 'https://1.bp.blogspot.com/-3dALaf3QkpQ/Tn-qnUV3FMI/AAAAAAAAAH4/x7qJfqH_veo/s1600/P1090186.JPG', 3.9, 'Lineal', 'Moderado', 1, 'El inicio se encuentra en la carretera CA-8201, que une Jimena de la Frontera con Puerto Galis. Entre el Km 56 y 57, coincidiendo con el núcleo recreativo La Sauceda.', 'https://goo.gl/maps/Y2GEhRpK4B18xkZm8', 4),
(18, 3, 'Cerro del Hierro', 'La ruta de senderismo del Cerro del Hierro es una experiencia única que permite a los visitantes adentrarse en un entorno natural de gran belleza. Durante el recorrido, se pueden contemplar impresionantes vistas panorámicas de la Sierra Norte de Sevilla, así como disfrutar de la fauna y flora autóctonas del lugar.\n\nUno de los atractivos principales de la ruta es la antigua mina de hierro del Cerro del Hierro, una muestra del patrimonio minero de la zona. También destacan las formaciones geológicas únicas de la zona, como los farallones, las cuevas y los acantilados, que dotan al lugar de una belleza natural inigualable.\n\nAdemás, la ruta cuenta con varios miradores desde donde se pueden apreciar las vistas panorámicas del paisaje, como el Mirador de la Ventana o el Mirador de la Breña. También se pueden visitar puntos de interés como el Puente del Hierro, una estructura metálica que cruza el río Huéznar, y el Cerro del Hierro, un pico que ofrece una vista panorámica del paisaje circundante.', 'https://www.carloscastrofotografo.com/wp-content/uploads/2017/08/cerro-del-hierro-sevilla-.jpg', 10, 'Circular', 'Moderado', 0, 'Desde Sevilla, tomar la Autovía A-66 dirección Mérida. Tomar la salida 793 hacia San Nicolás del Puerto. Seguir la carretera A-451 hasta San Nicolás del Puerto. Una vez en el pueblo, seguir las indicaciones hacia la ruta del Cerro del Hierro.', 'https://goo.gl/maps/pVuvjQD39eDSroi7A', NULL),
(43, 1, 'Ruta del Borosa', 'La Ruta del Borosa es una de las rutas más emblemáticas en el Parque Natural de las Sierras de Cazorla, Segura y Las Villas. Te llevará a lo largo del impresionante cañón del río Borosa, donde podrás disfrutar de espectaculares cascadas, paisajes montañosos y abundante vegetación. A lo largo del recorrido, encontrarás varios puentes y pasarelas que te permitirán cruzar el río y disfrutar de vistas panorámicas. También podrás visitar el Nacimiento del Río Borosa, una fuente natural de agua cristalina.', 'https://masalladelaciudad.com/wp-content/uploads/2014/09/IMG_1864-1024x575.jpg', 22, 'Circular', 'Moderado', 0, 'Desde Cazorla, toma la A-319 en dirección a La Iruela. Continúa por esta carretera hasta llegar al desvío señalizado hacia la Ruta del Borosa, donde encontrarás un área de estacionamiento para vehículos. El inicio de la ruta está bien señalizado.', 'https://goo.gl/maps/KdrYhPJWLXkZvfRr7', NULL),
(44, 1, 'Cazorla al Gilillo', 'Esta ruta te lleva desde la localidad de Cazorla hasta el pico Gilillo, ofreciendo impresionantes vistas panorámicas del Parque Natural de las Sierras de Cazorla, Segura y Las Villas. A medida que asciendes, podrás disfrutar de la belleza de la naturaleza y del entorno montañoso.', 'https://s1.wklcdn.com/image_21/641448/15791581/9881425Master.jpg', 20, 'Circular', 'Fácil', 0, 'El punto de partida suele ser desde la localidad de Cazorla. Puedes llegar a Cazorla por carretera desde diversas direcciones.', 'https://goo.gl/maps/TQ26exT4KHT6RCkA7', NULL),
(45, 2, 'Senda de los Carboneros', 'Esta ruta te llevará a través del Parque Natural de las Sierras Subbéticas, donde podrás disfrutar de la belleza de la naturaleza y visitar antiguos hornos de cal y restos de carboneras. La senda pasa por bosques de encinas y ofrece vistas panorámicas de la sierra.', 'https://s1.wklcdn.com/image_32/961396/83061181/53711446Master.jpg', 12, 'Circular', 'Fácil', 0, 'La ruta comienza generalmente en la localidad de Cabra, que se encuentra en la provincia de Córdoba. Puedes llegar a Cabra desde Córdoba capital en coche.', 'https://goo.gl/maps/9yo4fsVeVkjTZMcMA', NULL),
(46, 2, 'Arroyo de Guadalora', 'El Parque Natural de la Sierra de Hornachuelos es una de los espacios naturales más espectaculares de la provincia cordobesa. Situado en el oeste de la ciudad de Córdoba, pegado a la provincia de Sevilla –junto a la conocida como Sierra Norte de Sevilla- y perteneciente a las Dehesas de Sierra Morena, te encantará.\n\nAsí, tanto sus barrancos, paisajes abruptos y la vegetación, caracterizada por sus encinas, alcornoques e incluso algarrobos, constituyen un paisaje muy singular, atravesado por diversos arroyos. Precisamente, la ruta que hemos seleccionado transcurre por algunos de ellos, principalmente por el arroyo de Guadalora, así como por la localidad de Hornachuelos, en los aledaños del Embalse del Bembezar.', 'https://s1.wklcdn.com/image_6/187427/70446471/46367560Master.jpg', 7, 'Circular', 'Moderado', 0, 'Si te encuentras en la ciudad de Córdoba, puedes tomar la carretera A-431 en dirección suroeste hacia Hornachuelos. Esta carretera te llevará directamente al pueblo.', 'https://goo.gl/maps/Juepjtk6eCpzPJdf7', NULL),
(47, 3, 'Corredor Verde del Río Guadiamar', 'Cercano a Sanlucar la Mayor, un recorrido relajante, transita por camino de tierra junto a la ribera del río Guadiamar, podremos acercarnos al rio y ver variedad de arboleda y alguna fauna, la recuperación del lugar después del desastres medioambiental de hace años la recuperado ha sido satisfactoria, por su poca exigencia tranquilamente se puede realizar con personas de iniciación al senderismo. Después de hacerla podemos comer y pasar el recto del día en el área recreativa las Doblas, siendo el lugar que hemos dejado el coche, un lugar con bastante mesan y barbacoas.\nRecorrido que se puede hacer sin dificultad en bicicleta y senderistas.\nLa catalogo moderada por los kilómetros totales.\nNo recomendable en días calurosos.', 'https://www.escapadarural.com/blog/wp-content/uploads/2016/04/Corredor-verde-Guadiamar-5-1.jpg.webp', 16, 'Circular', 'Moderado', 0, 'Si te encuentras en la ciudad de Sevilla, puedes tomar la autovía A-49 en dirección oeste. Esta carretera te llevará hacia la localidad de Aznalcázar, que es el punto de partida del Corredor Verde.', 'https://goo.gl/maps/H1aiikftP3BwFDin9', NULL),
(48, 7, ' Los Cahorros', 'La Ruta de los Cahorros es una de las rutas de senderismo más populares en Andalucía debido a sus impresionantes paisajes y emocionantes puentes colgantes. La ruta te lleva a través de un profundo desfiladero formado por el río Monachil, donde caminarás por pasarelas de madera, puentes colgantes y túneles tallados en la roca. El paisaje es espectacular, con paredes rocosas que se elevan por encima del río.', 'https://i0.wp.com/milyunarutas.com/wp-content/uploads/2020/10/IMG_3052.jpeg?resize=840%2C473&ssl=1', 8, 'Circular', 'Moderado', 0, 'El punto de inicio de la ruta es el pueblo de Monachil, que se encuentra a unos 8 kilómetros de Granada. Puedes llegar a Monachil desde Granada en coche o en transporte público.', 'https://goo.gl/maps/amhfJg5tpoZo9QEA9', 4.5),
(49, 8, 'Sendero de los Genoveses', ': Esta ruta de senderismo te llevará a través de un paisaje natural impresionante en el Parque Natural de Cabo de Gata-Níjar, conocido por sus playas vírgenes y paisajes desérticos. El sendero te lleva desde el aparcamiento de la playa de Genoveses hasta la playa de Mónsul, pasando por dunas de arena y colinas con vistas panorámicas espectaculares. También es una excelente oportunidad para la observación de aves y la fotografía de la naturaleza.', 'https://s1.wklcdn.com/image_24/739386/126868436/81012280Master.jpg', 5, 'Lineal', 'Fácil', 0, 'El punto de inicio del sendero suele ser desde el aparcamiento de la playa de Genoveses, que se encuentra en el Parque Natural de Cabo de Gata-Níjar, en la provincia de Almería. Puedes llegar a la zona desde Almería en coche por la AL-3115.', 'https://goo.gl/maps/qKCs3gd3o8pN9Dwq8', NULL),
(50, 5, 'Arroyo del Descansadero', 'En este corto y cómodo sendero que une Benamahoma con el área recreativa Los Llanos del Campo, se camina cobijado por quejigos, encinas y algarrobos, mientras multitud de pajarillos revolotean entre la vegetación. El camino se acerca al curso de agua y a la fuente del Descansadero, celebrando el encuentro con lugares escondidos entre una vegetación espesa que oculta las ruinas del molino del Susto.\n\nLa fuente es una de tantas surgencias en esta sierra, en las que el agua abandona su circulación subterránea y sale a la superficie. Se encuentra rodeada de sauces llorones y pinos, en un lugar acogedor a la sombra en el que descansar rindiendo tributo a su propio nombre.\n', 'https://i0.wp.com/milyunarutas.com/wp-content/uploads/Molino-del-susto-en-el-Arroyo-del-Descansadero.jpeg?resize=1024%2C768&ssl=', 1.2, 'Lineal', 'Fácil', 0, 'Justo enfrente de la entrada alta al pueblo de Benamahoma, sobre la A-372, y junto a la parada de autobús, se encuentra el inicio del sendero.', 'https://maps.app.goo.gl/mmsTnGBWgesySUDA7', NULL),
(51, 5, 'Ojo del Moro', 'El nombre de este itinerario se debe a una curiosa formación que se encuentra en el pequeño cañón que forma el arroyo del Pajaruco. Se trata de un puente de roca en la parte alta de la pared, que parece un ojo dominando la lejanía.\n\nEl sendero transcurre por un terreno calizo y pedregoso hasta desembocar en una abandonada calera. Posteriormente, se observan los saltos de agua del Pajaruco, que hace honor a su nombre cobijando numerosos pájaros que se pueden escuchar. En algunos tramos, este arroyo tiene caídas de agua de más de diez metros. Al llegar al final de la ruta, se divisa el valle del río Tavizna con el Monte Higuerón y el castillo de Aznalmara dominando el paisaje desde la cima de un empinado cerro.\n', 'https://sendacadiz.es/gallery/115-1.jpg', 1.4, 'Lineal', 'Fácil', 0, 'Desde Benaocaz tomar la A-2302 hacia Ubrique. Tras recorrer 1 Km, girar por el carril de la derecha hacia Los Chozos. A los pocos metros se inicia el sendero.', 'https://maps.app.goo.gl/u1KuL4TNUFjnqY8o9', NULL),
(52, 5, 'Salto del Cabrero', 'Este sendero conecta el Puerto del Boyar con el núcleo urbano de Benaocaz, pasando por el desfiladero del Salto del Cabrero, visible durante todo el recorrido.\n\nLa composición caliza de estas sierras origina un paisaje de simas, galerías, cuevas, abrigos y fallas como este desfiladero, brecha que parte en dos el cerro con paredes verticales que superan los ochenta metros de altura, dejando un paso entre ellos de no más de cincuenta.\n\nEl carril discurre por la falda Noroeste de la Sierra del Endrinal, con vistas a la depresión del Boyar. Desde aquí se tiene la oportunidad de observar la Sierra de la Silla, el Cerro de las Cuevas, la Sierra de Albarracín, el embalse de los Hurones, de Bornos y de Guadalcacín, y la gran mole de la Sierra del Pinar.', 'https://sendacadiz.es/gallery/086-1.jpg', 7.2, 'Lineal', 'Moderado', 0, 'Desde Grazalema tomar la A-372 hacia Benamahoma. Tras recorrer unos 3 Km, se llega al Puerto del Boyar desde donde se inicia el sendero.', 'https://maps.app.goo.gl/NUS5QDQ59P2AZcWRA', NULL),
(53, 2, 'Sendero de Santa Rita', 'El inicio del sendero Santa Rita-Enrique Triano se localiza el centro de visitantes Santa Rita. Partiendo de la finca que le da nombre, nos adentraremos en una zona con abundante y diversa vegetación. Este es uno de los motivos por los que el sendero tiene especial interés para los aficionados y profesionales de la botánica. Encontraremos el típico bosque mediterráneo acompañados por sotobosque de rosales, majoletos, espinos negros, trepadoras y otras especies típicas de zonas húmedas y alrededores de manantiales.\n\nTras recorres unos 400 metros llegaremos a una bifurcación donde tendremos la posibilidad de continuar subiendo al mirador, o por el contrario, continuar el sendero que continua por la izquierda. Es recomendable comenzar realizando el sendero, ya a nuestra vuelta que regresaremos a esta bifurcación, pudiendo subir al mirador más tarde si lo deseamos.', 'https://s1.wklcdn.com/image_46/1401470/9784088/5860456Master.jpg', 2.3, 'Lineal', 'Moderado', 1, 'Al sendero Santa Rita – Enrique Triano se accede a través del Centro de Visitantes Santa Rita. Nos encontrarás en el punto kilométrico 8 de la carretera que une Cabra con Priego de Córdoba (A-339).', 'https://maps.app.goo.gl/abmbmzqfTCk4Kz3o6', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(128) NOT NULL,
  `correo` varchar(128) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `es_admin` tinyint(1) NOT NULL DEFAULT 0,
  `habilitada` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `correo`, `contraseña`, `es_admin`, `habilitada`) VALUES
(5, 'Marina', 'marina@gmail.com', '$2b$10$9GYHUg27fDY6iizCxVtNpuMGX1gYjXtchFeSRPNna4DixTHNhfuNy', 0, 1),
(6, 'Iván', 'ivan@gmail.com', '$2b$10$u1.VlqsWoXwZEqUemHGCaeYD5WrjeTylvo7xiDQp/cAza.enhOWGC', 1, 1),
(9, 'Rocío', 'rocio@gmail.com', '$2b$10$V4eFjrUoY1.WGhtteDIz8.r2y5AwtPN8jjXQTyXtFPPblG017BacK', 0, 1),
(11, 'Jesús', 'jesus@gmail.com', '$2b$10$isiE/.HByC.WUlPJZNX5B.ijr/hsZavxOB7lSmdLM9aMLuwK9JiPC', 0, 1),
(13, 'Juan', 'juan@gmail.com', '$2b$10$4D/y.P7kRkqTMabdqTfyk.sZyaHtS6ED2ALzCnBCAh/q9h/CJsJi6', 0, 1),
(18, 'Diego', 'diego@gmail.com', '$2b$10$82S32qEMFNG52JC4.hZ3veaLhK7ZhNkP69eAvs1Po0u50muMmtMZq', 0, 1),
(37, 'admin', 'admin@admin.com', '$2b$10$zGwhI./2P.7e1zllguqQgulaGr/b/kBxFPMU0.JWGR/yu/L3Yzntq', 1, 1),
(74, 'Rocío ', 'rocio-violeta@hotmail.es', '$2b$10$4rdEDcfueSGs.nT6x0IZIOJfsyH58vTpQ08tS40ooXSEnailhDikm', 0, 1),
(76, 'Isaac García 15', 'isaacgd1990@gmail.com', '$2b$10$7O.oAljaQWn/MC1K1/Y8lerUxq/tyziYTmFCYNDs7Ncb7dAdcpSIS', 0, 1),
(77, 'Lorena', 'lorenafdezcastro2505@gmail.com', '$2b$10$YlREQwNlUhq9sUNVj/Hf5OORo02iy0pTioWo/C9PFs09x5zOVdU0S', 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valoracion`
--

CREATE TABLE `valoracion` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_ruta` int(11) NOT NULL,
  `valoracion` int(1) NOT NULL,
  `comentario` text DEFAULT NULL,
  `publica` tinyint(1) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `valoracion`
--

INSERT INTO `valoracion` (`id`, `id_usuario`, `id_ruta`, `valoracion`, `comentario`, `publica`, `fecha`) VALUES
(8, 6, 6, 1, 'Muy básica y lineal.', 1, '2023-03-24 12:01:03'),
(9, 5, 6, 3, 'Me encanta.', 1, '2023-03-07 17:00:12'),
(11, 6, 5, 5, 'Complicada, pero las vistas merecen la pena.', 1, '2023-04-17 19:27:13'),
(12, 5, 4, 2, 'Me gusta', 1, '2023-03-07 17:14:55'),
(13, 11, 4, 3, 'Repetiría, por supuesto.', 1, '2023-03-08 12:30:08'),
(16, 11, 6, 1, 'No me ha gustado.', 1, '2023-03-08 12:57:22'),
(28, 11, 3, 4, 'Muy bonita.', 1, '2023-03-08 17:32:11'),
(32, 13, 3, 1, 'Aburrida.', 1, '2023-03-08 16:08:17'),
(35, 6, 3, 3, 'Decente.', 1, '2023-04-25 18:48:59'),
(38, 6, 4, 1, 'No me gusta', 1, '2023-03-13 15:16:01'),
(57, 6, 9, 5, 'Me ha encantado. Repetiría.', 1, '2023-03-27 13:35:39'),
(63, 5, 5, 2, 'Muy difícil.', 1, '2023-04-21 16:52:04'),
(71, 13, 7, 1, 'Me ha encantado, de las mejores rutas que he visitado.', 1, '2023-09-19 21:48:31'),
(78, 13, 9, 3, 'Buena ruta', 1, '2024-01-29 21:48:06'),
(79, 6, 48, 4, 'El primer tramo es el más bonito de toda la ruta', 1, '2023-11-21 19:11:34'),
(80, 18, 48, 5, 'La mejor ruta de mi vida', 1, '2023-11-21 19:12:10');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `coordenada`
--
ALTER TABLE `coordenada`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_coordenada_ruta_senderismo` (`id_ruta`);

--
-- Indices de la tabla `lista_revisar`
--
ALTER TABLE `lista_revisar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `provincia`
--
ALTER TABLE `provincia`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `publicacion`
--
ALTER TABLE `publicacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `publicacion_ibfk_1` (`id_usuario`);

--
-- Indices de la tabla `ruta_completada`
--
ALTER TABLE `ruta_completada`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_ruta` (`id_ruta`);

--
-- Indices de la tabla `ruta_pendiente`
--
ALTER TABLE `ruta_pendiente`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_ruta` (`id_ruta`);

--
-- Indices de la tabla `ruta_senderismo`
--
ALTER TABLE `ruta_senderismo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ruta_senderismo_ibfk_1` (`id_provincia`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `valoracion`
--
ALTER TABLE `valoracion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_ruta` (`id_ruta`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `coordenada`
--
ALTER TABLE `coordenada`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `lista_revisar`
--
ALTER TABLE `lista_revisar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de la tabla `provincia`
--
ALTER TABLE `provincia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `publicacion`
--
ALTER TABLE `publicacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT de la tabla `ruta_completada`
--
ALTER TABLE `ruta_completada`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT de la tabla `ruta_pendiente`
--
ALTER TABLE `ruta_pendiente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;

--
-- AUTO_INCREMENT de la tabla `ruta_senderismo`
--
ALTER TABLE `ruta_senderismo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT de la tabla `valoracion`
--
ALTER TABLE `valoracion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `coordenada`
--
ALTER TABLE `coordenada`
  ADD CONSTRAINT `fk_coordenada_ruta_senderismo` FOREIGN KEY (`id_ruta`) REFERENCES `ruta_senderismo` (`id`);

--
-- Filtros para la tabla `lista_revisar`
--
ALTER TABLE `lista_revisar`
  ADD CONSTRAINT `lista_revisar_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `publicacion`
--
ALTER TABLE `publicacion`
  ADD CONSTRAINT `publicacion_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `ruta_completada`
--
ALTER TABLE `ruta_completada`
  ADD CONSTRAINT `ruta_completada_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `ruta_completada_ibfk_2` FOREIGN KEY (`id_ruta`) REFERENCES `ruta_senderismo` (`id`);

--
-- Filtros para la tabla `ruta_pendiente`
--
ALTER TABLE `ruta_pendiente`
  ADD CONSTRAINT `ruta_pendiente_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `ruta_pendiente_ibfk_2` FOREIGN KEY (`id_ruta`) REFERENCES `ruta_senderismo` (`id`);

--
-- Filtros para la tabla `ruta_senderismo`
--
ALTER TABLE `ruta_senderismo`
  ADD CONSTRAINT `ruta_senderismo_ibfk_1` FOREIGN KEY (`id_provincia`) REFERENCES `provincia` (`id`);

--
-- Filtros para la tabla `valoracion`
--
ALTER TABLE `valoracion`
  ADD CONSTRAINT `valoracion_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `valoracion_ibfk_2` FOREIGN KEY (`id_ruta`) REFERENCES `ruta_senderismo` (`id`);
--
-- Base de datos: `bz5rcefayjff6z8fpwfn`
--
CREATE DATABASE IF NOT EXISTS `bz5rcefayjff6z8fpwfn` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `bz5rcefayjff6z8fpwfn`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lista_revisar`
--

CREATE TABLE `lista_revisar` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `elemento` varchar(255) NOT NULL,
  `marcado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `lista_revisar`
--

INSERT INTO `lista_revisar` (`id`, `id_usuario`, `elemento`, `marcado`) VALUES
(4, 6, 'Cámara GoPro', 0),
(5, 6, 'Trípode GoPro', 0),
(6, 6, 'Baterías GoPro', 0),
(7, 6, 'Agua', 0),
(8, 6, 'Zumo', 0),
(10, 5, 'Comida', 0),
(13, 6, 'Comida', 0),
(14, 6, 'Batería externa', 0),
(16, 5, 'Bikini', 0),
(17, 11, 'Comida', 0),
(18, 11, 'Zapatos cómodos', 0),
(19, 5, 'Crema solar', 0),
(20, 6, 'Ibuprofeno', 0),
(21, 6, 'Kit primeros auxilios', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `provincia`
--

CREATE TABLE `provincia` (
  `id` int(11) NOT NULL,
  `nombre` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `provincia`
--

INSERT INTO `provincia` (`id`, `nombre`) VALUES
(1, 'Jaén'),
(2, 'Córdoba'),
(3, 'Sevilla'),
(4, 'Huelva'),
(5, 'Cádiz'),
(6, 'Málaga'),
(7, 'Granada'),
(8, 'Almería');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ruta_completada`
--

CREATE TABLE `ruta_completada` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_ruta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ruta_completada`
--

INSERT INTO `ruta_completada` (`id`, `id_usuario`, `id_ruta`) VALUES
(7, 6, 6),
(15, 6, 5),
(17, 5, 6),
(19, 5, 5),
(20, 11, 3),
(21, 11, 4),
(22, 11, 6),
(27, 15, 3),
(28, 15, 5),
(29, 16, 3),
(30, 16, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ruta_pendiente`
--

CREATE TABLE `ruta_pendiente` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_ruta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ruta_pendiente`
--

INSERT INTO `ruta_pendiente` (`id`, `id_usuario`, `id_ruta`) VALUES
(53, 6, 4),
(60, 11, 3),
(61, 11, 5),
(63, 5, 5),
(64, 5, 3),
(69, 6, 5),
(70, 6, 3),
(71, 15, 6),
(72, 15, 4),
(73, 16, 3),
(74, 16, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ruta_senderismo`
--

CREATE TABLE `ruta_senderismo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `longitud` float NOT NULL,
  `tipo` enum('Lineal','Circular','Semicircular') NOT NULL,
  `dificultad` enum('Fácil','Moderado','Difícil') NOT NULL,
  `permiso_necesario` tinyint(1) NOT NULL,
  `como_llegar` text NOT NULL,
  `enlace_maps` varchar(255) DEFAULT NULL,
  `media_valoraciones` float DEFAULT NULL,
  `id_provincia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ruta_senderismo`
--

INSERT INTO `ruta_senderismo` (`id`, `nombre`, `descripcion`, `imagen`, `longitud`, `tipo`, `dificultad`, `permiso_necesario`, `como_llegar`, `enlace_maps`, `media_valoraciones`, `id_provincia`) VALUES
(3, 'Cerro del Águila', 'En la otra orilla del Guadalquivir, Doñana sigue siendo un espacio cargado de riquezas. Este sendero descubre parte de ellas, ofreciendo un recorrido por una zona en la que campean numerosas especies. La ruta permite asistir al encuentro entre los dominios del mar y la tierra, aquellos en las que la industria salinera ha prosperado; otear desde dunas fósiles las vistas del río y la otra orilla enfrente; y apreciar las sutilezas de una vegetación que tiñe de matices verdes este itinerario. Especial relevancia posee la laguna de Tarelo por ser refugio de muchas aves, entre las que es posible observar malvasías, porrones o somormujos junto con zampullines y fochas. En cuanto a vegetación, durante el itinerario tendremos la oportunidad de observar principalmente grandes pinos y sabinas.', 'https://sendacadiz.es/gallery/2-CERRO_DEL_AGUILA_9p2kwvls.jpg', 4.1, 'Circular', 'Fácil', 0, 'Desde Sanlúcar de Barrameda tomar la carretera secundaria CA-9027 en dirección a La Algaida. Esta carretera llega hasta la entrada del Pinar de Monte Algaida, donde comienza el sendero.', 'https://goo.gl/maps/HsMzZ5aA5kV732LC6', 2.33, 1),
(4, 'Garganta de Bogas', 'La ruta se sitúa en los Llanos del Valle, entre la Sierra de la Sal y la Sierra de las Cabras, uno de los relieves más importantes que se reconocen en las campiñas gaditanas.\r\n\r\nEstas sierras dibujan un arco muy pronunciado inmediatamente al Sur del embalse de Guadalcacín. La Garganta de Bogas se corresponde con un espectacular cañón kárstico que corta el arco que forman las sierras aledañas, drenando sus aguas hacia el embalse del Guadalcacín. Este corte transversal tuvo lugar en épocas pasadas por el arroyo que discurre por la garganta, al descender su nivel de base.', 'https://sendacadiz.es/gallery/022-1.jpg', 5.2, 'Lineal', 'Moderado', 0, 'Desde San José del Valle salir en dirección Alcalá de los Gazules por la carretera CA-5102. Pasado el punto kilométrico 8 tomar el camino de la izquierda, donde comienza el sendero.', 'https://goo.gl/maps/DBdgmMtp5hLk3ZGMA', 2, 1),
(5, 'El Torreón', 'Este sendero conduce al techo de la provincia gaditana, el pico más alto de la Sierra del Pinar. Formidable atalaya donde se puede contemplar una buena parte de Andalucía. Es un ascenso algo duro pero recompensa y se puede tomar aliento en la cumbre con inmejorables vistas.\r\n\r\nDurante el ascenso, es posible conocer formaciones geológicas características de terrenos calizos, pudiendo avistar rapaces y coloridos pajarillos, y con un poco se suerte, cabras montesas.\r\n\r\nConforme se gana altura, la vegetación es diferente. Esto se conoce como pisos de vegetación. Al acercarse a la cumbre, la vegetación desaparece quedando el roquedo al descubierto. En esta zona hay que extremar las precauciones, montones de piedras a modo de señal, marcan el camino y alguna marca de pintura para llegar a la cumbre.\r\n', 'https://sendacadiz.es/gallery/084-1.jpg', 3, 'Lineal', 'Difícil', 1, 'Desde Benamahoma tomar la A-372 hacia Grazalema. Tras recorrer unos 5 Km, el sendero se inicia en un camino a la izquierda.', 'https://goo.gl/maps/yYYeG6MQF786ciVm7', 3.5, 1),
(6, 'Los Toruños', 'Este sendero permite conocer las marismas mejor conservadas del Parque Natural Bahía de Cádiz. El río San Pedro lleva sus aguas hasta la playa de Levante. En su recorrido, alimenta con multitud de caños a estas marismas, en las que se puede comprobar como la conservación de la naturaleza no está, en absoluto, reñida con el uso público y disfrute de las poblaciones vecinas. Durante el recorrido se puede acceder a la playa de Levante, compuesta por una flecha litoral y el cordón de dunas.\r\n\r\nEn las marismas, las aguas dulces y saladas se mezclan, y las criaturas de unas y otras también. La productividad biológica en ellas es altísima. Constituyen, además, hábitat indispensables para la reproducción de numerosas aves y especies marítimas.', 'https://sendacadiz.es/gallery/151-1.jpg', 5.2, 'Lineal', 'Fácil', 0, 'En la urbanización de la playa de Valdelagrana (El Puerto de Santa María), tomar la avenida del Mar, hasta el centro de recepción de visitantes del Parque Metropolitano Marisma de los Toruños y Pinar de la Algaida, lugar de inicio del sendero.', 'https://goo.gl/maps/SWa764raq55qmnPx5', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `contraseña` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `correo`, `contraseña`) VALUES
(5, 'Marina', 'marina@gmail.com', '$2b$10$NL7UdioCAaebOa.753CeKeTGeCkMp//h3AmNxQ9XgolBwVCiBIU.K'),
(6, 'Iván', 'ivan@gmail.com', '$2b$10$/ODY95N0yLPSXG.bZMPCmu.pGJkkJhiF/qD0KWrnCdiuClQMDXuUy'),
(9, 'Rocío', 'rocio@gmail.com', '$2b$10$V4eFjrUoY1.WGhtteDIz8.r2y5AwtPN8jjXQTyXtFPPblG017BacK'),
(11, 'Jesús', 'jesus@gmail.com', '$2b$10$isiE/.HByC.WUlPJZNX5B.ijr/hsZavxOB7lSmdLM9aMLuwK9JiPC'),
(13, 'Juan', 'juan@gmail.com', '$2b$10$4D/y.P7kRkqTMabdqTfyk.sZyaHtS6ED2ALzCnBCAh/q9h/CJsJi6'),
(15, 'Diego', 'diego@gmail.com', '$2b$10$LZhsHRdlcPWV.AZobl9LgObaR0piL5SKimMIJ9vBVzWerd4T0MO46'),
(16, 'Adri', 'adri@gmail.com', '$2b$10$LY98UXHtY2e69RnbqtuKXuv4BwjpGhpbIhbW4OJeJ1SpYc3/KB/m6');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valoracion`
--

CREATE TABLE `valoracion` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_ruta` int(11) NOT NULL,
  `valoracion` int(11) NOT NULL,
  `comentario` text DEFAULT NULL,
  `publica` tinyint(1) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `valoracion`
--

INSERT INTO `valoracion` (`id`, `id_usuario`, `id_ruta`, `valoracion`, `comentario`, `publica`, `fecha`) VALUES
(2, 5, 5, 2, 'Muy difícil.', 1, '2023-02-27 09:04:06'),
(8, 6, 6, 2, 'Muy básica y lineal.', 1, '2023-03-06 12:11:46'),
(9, 5, 6, 3, 'Me encanta.', 1, '2023-03-07 16:00:12'),
(11, 6, 5, 5, 'Ruta complicada pero satisfactoria.', 1, '2023-03-08 09:16:37'),
(12, 5, 4, 2, 'Me gusta', 1, '2023-03-07 16:14:55'),
(13, 11, 4, 3, 'Repetiría, por supuesto.', 1, '2023-03-08 11:30:08'),
(16, 11, 6, 1, 'No me ha gustado.', 1, '2023-03-08 11:57:22'),
(28, 11, 3, 4, 'Muy bonita.', 1, '2023-03-08 16:32:11'),
(32, 13, 3, 1, 'Aburrida.', 1, '2023-03-08 15:08:17'),
(35, 6, 3, 2, 'Decente.', 1, '2023-03-08 16:31:49'),
(38, 6, 4, 1, 'No me gusta', 1, '2023-03-13 14:16:01');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `lista_revisar`
--
ALTER TABLE `lista_revisar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `provincia`
--
ALTER TABLE `provincia`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ruta_completada`
--
ALTER TABLE `ruta_completada`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_ruta` (`id_ruta`);

--
-- Indices de la tabla `ruta_pendiente`
--
ALTER TABLE `ruta_pendiente`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_ruta` (`id_ruta`);

--
-- Indices de la tabla `ruta_senderismo`
--
ALTER TABLE `ruta_senderismo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ruta_senderismo_ibfk_1` (`id_provincia`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `valoracion`
--
ALTER TABLE `valoracion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_ruta` (`id_ruta`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `lista_revisar`
--
ALTER TABLE `lista_revisar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `provincia`
--
ALTER TABLE `provincia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `ruta_completada`
--
ALTER TABLE `ruta_completada`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `ruta_pendiente`
--
ALTER TABLE `ruta_pendiente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT de la tabla `ruta_senderismo`
--
ALTER TABLE `ruta_senderismo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `valoracion`
--
ALTER TABLE `valoracion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ruta_senderismo`
--
ALTER TABLE `ruta_senderismo`
  ADD CONSTRAINT `ruta_senderismo_ibfk_1` FOREIGN KEY (`id_provincia`) REFERENCES `provincia` (`id`);
--
-- Base de datos: `phpmyadmin`
--
CREATE DATABASE IF NOT EXISTS `phpmyadmin` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `phpmyadmin`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__bookmark`
--

CREATE TABLE `pma__bookmark` (
  `id` int(10) UNSIGNED NOT NULL,
  `dbase` varchar(255) NOT NULL DEFAULT '',
  `user` varchar(255) NOT NULL DEFAULT '',
  `label` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `query` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Bookmarks';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__central_columns`
--

CREATE TABLE `pma__central_columns` (
  `db_name` varchar(64) NOT NULL,
  `col_name` varchar(64) NOT NULL,
  `col_type` varchar(64) NOT NULL,
  `col_length` text DEFAULT NULL,
  `col_collation` varchar(64) NOT NULL,
  `col_isNull` tinyint(1) NOT NULL,
  `col_extra` varchar(255) DEFAULT '',
  `col_default` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Central list of columns';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__column_info`
--

CREATE TABLE `pma__column_info` (
  `id` int(5) UNSIGNED NOT NULL,
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `column_name` varchar(64) NOT NULL DEFAULT '',
  `comment` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `mimetype` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `transformation` varchar(255) NOT NULL DEFAULT '',
  `transformation_options` varchar(255) NOT NULL DEFAULT '',
  `input_transformation` varchar(255) NOT NULL DEFAULT '',
  `input_transformation_options` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Column information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__designer_settings`
--

CREATE TABLE `pma__designer_settings` (
  `username` varchar(64) NOT NULL,
  `settings_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Settings related to Designer';

--
-- Volcado de datos para la tabla `pma__designer_settings`
--

INSERT INTO `pma__designer_settings` (`username`, `settings_data`) VALUES
('root', '{\"angular_direct\":\"direct\",\"snap_to_grid\":\"off\",\"relation_lines\":\"true\"}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__export_templates`
--

CREATE TABLE `pma__export_templates` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL,
  `export_type` varchar(10) NOT NULL,
  `template_name` varchar(64) NOT NULL,
  `template_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved export templates';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__favorite`
--

CREATE TABLE `pma__favorite` (
  `username` varchar(64) NOT NULL,
  `tables` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Favorite tables';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__history`
--

CREATE TABLE `pma__history` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL DEFAULT '',
  `db` varchar(64) NOT NULL DEFAULT '',
  `table` varchar(64) NOT NULL DEFAULT '',
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp(),
  `sqlquery` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='SQL history for phpMyAdmin';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__navigationhiding`
--

CREATE TABLE `pma__navigationhiding` (
  `username` varchar(64) NOT NULL,
  `item_name` varchar(64) NOT NULL,
  `item_type` varchar(64) NOT NULL,
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Hidden items of navigation tree';

--
-- Volcado de datos para la tabla `pma__navigationhiding`
--

INSERT INTO `pma__navigationhiding` (`username`, `item_name`, `item_type`, `db_name`, `table_name`) VALUES
('root', 'lista_revisar', 'table', 'getaways_db', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__pdf_pages`
--

CREATE TABLE `pma__pdf_pages` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `page_nr` int(10) UNSIGNED NOT NULL,
  `page_descr` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='PDF relation pages for phpMyAdmin';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__recent`
--

CREATE TABLE `pma__recent` (
  `username` varchar(64) NOT NULL,
  `tables` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Recently accessed tables';

--
-- Volcado de datos para la tabla `pma__recent`
--

INSERT INTO `pma__recent` (`username`, `tables`) VALUES
('root', '[{\"db\":\"getaways_db\",\"table\":\"usuario\"},{\"db\":\"getaways_db\",\"table\":\"valoracion\"},{\"db\":\"getaways_db\",\"table\":\"ruta_senderismo\"},{\"db\":\"getaways_db\",\"table\":\"lista_revisar\"},{\"db\":\"getaways_db\",\"table\":\"ruta_pendiente\"},{\"db\":\"getaways_db\",\"table\":\"ruta_completada\"},{\"db\":\"getaways_db\",\"table\":\"publicacion\"},{\"db\":\"getaways_db\",\"table\":\"coordenada\"},{\"db\":\"getaways_db\",\"table\":\"provincia\"},{\"db\":\"bz5rcefayjff6z8fpwfn\",\"table\":\"ruta_senderismo\"}]');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__relation`
--

CREATE TABLE `pma__relation` (
  `master_db` varchar(64) NOT NULL DEFAULT '',
  `master_table` varchar(64) NOT NULL DEFAULT '',
  `master_field` varchar(64) NOT NULL DEFAULT '',
  `foreign_db` varchar(64) NOT NULL DEFAULT '',
  `foreign_table` varchar(64) NOT NULL DEFAULT '',
  `foreign_field` varchar(64) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Relation table';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__savedsearches`
--

CREATE TABLE `pma__savedsearches` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL DEFAULT '',
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `search_name` varchar(64) NOT NULL DEFAULT '',
  `search_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved searches';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__table_coords`
--

CREATE TABLE `pma__table_coords` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `pdf_page_number` int(11) NOT NULL DEFAULT 0,
  `x` float UNSIGNED NOT NULL DEFAULT 0,
  `y` float UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table coordinates for phpMyAdmin PDF output';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__table_info`
--

CREATE TABLE `pma__table_info` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `display_field` varchar(64) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__table_uiprefs`
--

CREATE TABLE `pma__table_uiprefs` (
  `username` varchar(64) NOT NULL,
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL,
  `prefs` text NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Tables'' UI preferences';

--
-- Volcado de datos para la tabla `pma__table_uiprefs`
--

INSERT INTO `pma__table_uiprefs` (`username`, `db_name`, `table_name`, `prefs`, `last_update`) VALUES
('root', 'getaways_db', 'usuario', '{\"sorted_col\":\"`usuario`.`id` ASC\"}', '2023-03-13 19:21:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__tracking`
--

CREATE TABLE `pma__tracking` (
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL,
  `version` int(10) UNSIGNED NOT NULL,
  `date_created` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `schema_snapshot` text NOT NULL,
  `schema_sql` text DEFAULT NULL,
  `data_sql` longtext DEFAULT NULL,
  `tracking` set('UPDATE','REPLACE','INSERT','DELETE','TRUNCATE','CREATE DATABASE','ALTER DATABASE','DROP DATABASE','CREATE TABLE','ALTER TABLE','RENAME TABLE','DROP TABLE','CREATE INDEX','DROP INDEX','CREATE VIEW','ALTER VIEW','DROP VIEW') DEFAULT NULL,
  `tracking_active` int(1) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Database changes tracking for phpMyAdmin';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__userconfig`
--

CREATE TABLE `pma__userconfig` (
  `username` varchar(64) NOT NULL,
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `config_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User preferences storage for phpMyAdmin';

--
-- Volcado de datos para la tabla `pma__userconfig`
--

INSERT INTO `pma__userconfig` (`username`, `timevalue`, `config_data`) VALUES
('root', '2024-01-30 14:57:00', '{\"Console\\/Mode\":\"collapse\",\"lang\":\"es\"}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__usergroups`
--

CREATE TABLE `pma__usergroups` (
  `usergroup` varchar(64) NOT NULL,
  `tab` varchar(64) NOT NULL,
  `allowed` enum('Y','N') NOT NULL DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User groups with configured menu items';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__users`
--

CREATE TABLE `pma__users` (
  `username` varchar(64) NOT NULL,
  `usergroup` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Users and their assignments to user groups';

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pma__central_columns`
--
ALTER TABLE `pma__central_columns`
  ADD PRIMARY KEY (`db_name`,`col_name`);

--
-- Indices de la tabla `pma__column_info`
--
ALTER TABLE `pma__column_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `db_name` (`db_name`,`table_name`,`column_name`);

--
-- Indices de la tabla `pma__designer_settings`
--
ALTER TABLE `pma__designer_settings`
  ADD PRIMARY KEY (`username`);

--
-- Indices de la tabla `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_user_type_template` (`username`,`export_type`,`template_name`);

--
-- Indices de la tabla `pma__favorite`
--
ALTER TABLE `pma__favorite`
  ADD PRIMARY KEY (`username`);

--
-- Indices de la tabla `pma__history`
--
ALTER TABLE `pma__history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`,`db`,`table`,`timevalue`);

--
-- Indices de la tabla `pma__navigationhiding`
--
ALTER TABLE `pma__navigationhiding`
  ADD PRIMARY KEY (`username`,`item_name`,`item_type`,`db_name`,`table_name`);

--
-- Indices de la tabla `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  ADD PRIMARY KEY (`page_nr`),
  ADD KEY `db_name` (`db_name`);

--
-- Indices de la tabla `pma__recent`
--
ALTER TABLE `pma__recent`
  ADD PRIMARY KEY (`username`);

--
-- Indices de la tabla `pma__relation`
--
ALTER TABLE `pma__relation`
  ADD PRIMARY KEY (`master_db`,`master_table`,`master_field`),
  ADD KEY `foreign_field` (`foreign_db`,`foreign_table`);

--
-- Indices de la tabla `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_savedsearches_username_dbname` (`username`,`db_name`,`search_name`);

--
-- Indices de la tabla `pma__table_coords`
--
ALTER TABLE `pma__table_coords`
  ADD PRIMARY KEY (`db_name`,`table_name`,`pdf_page_number`);

--
-- Indices de la tabla `pma__table_info`
--
ALTER TABLE `pma__table_info`
  ADD PRIMARY KEY (`db_name`,`table_name`);

--
-- Indices de la tabla `pma__table_uiprefs`
--
ALTER TABLE `pma__table_uiprefs`
  ADD PRIMARY KEY (`username`,`db_name`,`table_name`);

--
-- Indices de la tabla `pma__tracking`
--
ALTER TABLE `pma__tracking`
  ADD PRIMARY KEY (`db_name`,`table_name`,`version`);

--
-- Indices de la tabla `pma__userconfig`
--
ALTER TABLE `pma__userconfig`
  ADD PRIMARY KEY (`username`);

--
-- Indices de la tabla `pma__usergroups`
--
ALTER TABLE `pma__usergroups`
  ADD PRIMARY KEY (`usergroup`,`tab`,`allowed`);

--
-- Indices de la tabla `pma__users`
--
ALTER TABLE `pma__users`
  ADD PRIMARY KEY (`username`,`usergroup`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pma__column_info`
--
ALTER TABLE `pma__column_info`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pma__history`
--
ALTER TABLE `pma__history`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  MODIFY `page_nr` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- Base de datos: `test`
--
CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `test`;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

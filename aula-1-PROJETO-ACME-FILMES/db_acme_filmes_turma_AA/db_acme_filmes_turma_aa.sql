create database db_acme_filmes_turma_aa;

use db_acme_filmes_turma_aa;

create table tbl_classificacoes(
	id int not null auto_increment primary key,
	sigla varchar(5) not null,
    classificacao varchar(45) not null,
    legenda varchar(150) not null,
    imagem varchar(300) not null
);

insert into 
	tbl_classificacoes(
		sigla,
        classificacao,
        legenda,
        imagem
	)
values
	(
		"L",
        "Livre para todos os públicos",
        "Esta programação não tem conteúdos potencialmente prejudiciais para qualquer faixa etária",
        "https://raw.githubusercontent.com/LUIZHVA02/Back-II-Leonid/main/Front-acme/image/png/classi-indicativa-livre.png"
	),
	(
		"A10",
        "Não recomendado para menores de 10 anos",
        "Esta programação pode ter conteúdo violento e linguagem imprópria de nível leve",
        "https://raw.githubusercontent.com/LUIZHVA02/Back-II-Leonid/main/Front-acme/image/png/classi-indicativa10.png"
	),
	(
		"A12","Não recomendado para menores de 12 anos",
        "Esta programação possui cenas de agressão física leve, insinuação de consumo de drogas e insinuação leve de sexo",
        "https://raw.githubusercontent.com/LUIZHVA02/Back-II-Leonid/main/Front-acme/image/png/classi-indicativa12.png"
	),
	(
		"A14","Não recomendado para menores de 14 anos",
        "Esta programação possui cenas de agressão física média, consumo de drogas explícito e insinuação de sexo acentuada",
        "https://raw.githubusercontent.com/LUIZHVA02/Back-II-Leonid/main/Front-acme/image/png/classi-indicativa14.png"
	),
	(
		"A16",
		"Não recomendado para menores de 16 anos",
		"Esta programação possui cenas de agressão física acentuada, consumo de drogas explícito e insinuação de sexo acentuada",
        "https://raw.githubusercontent.com/LUIZHVA02/Back-II-Leonid/main/Front-acme/image/png/classi-indicativa16.png"
    ),
	(
		"A18",
        "Não recomendado para menores de 18 anos",
        "Esta programação possui cenas de violência extrema, suicídio, consumo e indução ao consumo de drogas, sexo explícito e distúrbios psicossomáticos",
        "https://raw.githubusercontent.com/LUIZHVA02/Back-II-Leonid/main/Front-acme/image/png/classi-indicativa18.png"
	);



create table tbl_generos(
	id int not null auto_increment primary key,
	nome varchar(100) not null
);

insert into
	tbl_generos(
		nome
	)
values
	("Ação"),
    ("Animação"),
    ("Aventura"),
    ("Chanchada"),
	("Cinema Catástrofe"),
	("Comédia"),
    ("Comédia de Ação"),
    ("Comédia Dramática"),
	("Comédia Romântica"),
    ("Cult"),
    ("Documentários"),
    ("Drama"),
	("Espionagem"),
	("Erótico"),
    ("Fantasia"),
    ("Faroeste"),
    ("Ficção científica"),
	("Franchise/Séries"),
	("Guerra"),
    ("Machinima"),
    ("Musical"),
    ("Filme noir"),
	("Policial"),
	("Pornochanchada"),
    ("Pornográfico"),
    ("Romance"),
    ("Suspense"),
	("Terror"),
	("Trash");

create table tbl_sexo(
	id int not null auto_increment primary key,
	sexo varchar(20) not null
);

insert into
	tbl_sexo(
		sexo
	)
values
	("Feminino"),
    ("Masculino");

create table tbl_atores(
	id int not null auto_increment primary key,
	nome varchar(200) not null,
    foto_ator varchar(300) not null,
    dt_nasc date not null,
    dt_falec date,
    sobre text,
    id_sexo int not null,
    foreign key (id_sexo) references tbl_sexo(id)
);

insert into
	tbl_atores(
		nome,
        foto_ator,
        dt_nasc,
        sobre,
        id_sexo
    )
values
	(
		"Willard Christopher Smith Jr.",
        "https://br.web.img3.acsta.net/c_310_420/pictures/17/02/08/16/50/452749.jpg",
        "1968-09-25",
        "Criado numa família de classe média, o jovem Will Smith, mesmo com altas notas na escola e um futuro acadêmico promissor, 
			preferiu abandonar os estudos e investir na carreira de rapper, apresentando-se com um amigo sob o nome de 'Fresh Prince'.
			O duo 'DJ Jazzy Jeff and the Fresh Prince' rapidamente conquistou o EUA, com diversos hits que passavam nas rádios, 
			como 'Summertime' e 'Parents Just Don’t Understand'. Milionário aos 20 anos de idade, Smith gastou sua fortuna em carros, 
            casas e joias, beirando a falência antes do 25° aniversário. Em 1989, o produtor Benny Medina mudou sua carreira ao propor 
            a criação de um seriado de televisão baseado na sua vida: um garoto dos bairros negros que teria vida nova na rica região 
            de Beverly Hills. Smith aceitou, e com a aprovação da rede NBC, a série Um Maluco no Pedaço (1990) durou seis temporadas, 
            e transformou o rapper em ator. Ele rapidamente aceitou as propostas de atuar no cinema, como no drama Seis Graus de Separação (1993), 
            que chamou a atenção da crítica ao seu talento dramático. Seu primeiro grande sucesso de bilheteria foi Bad Boys (1995), 
            que provou sua capacidade de estrelar grandes filmes de ação. Assim, vários diretores renomados apostaram na imagem 
            carismática de Smith, como Roland Emmerich em Independence Day (1996), Barry Sonnenfeld em Homens de Preto (1997) e 
            Tony Scott em Inimigo do Estado (1998). Todos os filmes obtiveram um grande sucesso de público. Com a rápida notoriedade, 
            o ator foi convidado a ser o protagonista de Matrix, mas Smith preferiu recusar o convite e investir na aventura cômica 
            As Loucas Aventuras de James West (1999). Este talvez tenha sido o maior fracasso de sua carreira, um arrependimento 
            admitido pelo próprio ator. Desde então, com maior cuidado nas escolhas, Smith tornou-se o único ator da história a 
            acumular oito filmes consecutivos com bilheteria superior a 100 milhões de dólares. Ele é sempre citado nas listas 
            especializadas como um dos atores mais rentáveis de Hollywood. Paralelamente, ele também investe na carreira de produtor 
            e produtor executivo, principalmente dos filmes em que estrela. Sua longa série de sucessos inclui gêneros variados, 
            como os dramas Ali (2001) e À Procura da Felicidade (2006), pelos quais ele foi indicado duas vezes ao Oscar, 
            o filme de ação Bad Boys II (2003), as ficções científicas Homens de Preto II (2002) e Eu Sou a Lenda (2007),
            a comédia Hitch - Conselheiro Amoroso (2005) e a animação O Espanta Tubarões (2004). Desde o drama Sete Vidas (2008), 
            Will Smith tem se consagrado em continuações de franquias de sucesso, como Homens de Preto III (2012), Bad Boys III (2013) 
            além do filme de ficção científica dirigido por M. Night Shyamalan (O Sexto Sentido), intitulado Depois da Terra (2013). 
            Will Smith se casou com a também atriz Jada Koren Pinkett em 1997. Juntos, eles têm dois filhos: Jaden Christopher Syre Smith (nascido em 1998), 
            sua co-estrela em À Procura da Felicidade (2006) e Depois da Terra (2013), e Willow Camille Reign Smith (nascida em 2000), 
            que apareceu como sua filha em Eu Sou a Lenda (2007). Smith e seu irmão Harry possuem a Treyball Development Inc., 
            uma empresa com sede em Beverly Hills. Ele mora em Los Angeles, Califórnia, com sua família. O ator foi citado na lista dos 
            '40 mais ricos' da Fortune Magazine, dos 40 americanos mais ricos com menos de 40 anos.",
        2
    ),
	(
		"Morgan Freeman",
        "https://image.tmdb.org/t/p/w500//jPsLqiYGSofU4s6BjrxnefMfabb.jpg",
        "1937-06-01",
        "Morgan Freeman é um premiado ator, produtor, narrador e cineasta norte-americano. Nascido em Memphis, Tennessee, 
			em 1 de junho de 1937, ele passeou por diversos gêneros de filmes, sendo particularmente reconhecido por sua voz marcante. 
			Freeman recebeu vários prêmios ao longo de sua carreira, incluindo um Oscar, um Globo de Ouro e um Screen Actors Guild Award. 
            Ele é mais conhecido por seus trabalhos em Conduzindo Miss Daisy (1989), Tempo de Glória (1989), 
            Robin Hood - O Príncipe dos Ladrões (1991), Os Imperdoáveis (1992), Seven - Os Sete Crimes Capitais(1995), Todo Poderoso(2003) 
            e A Volta do Todo Poderoso (2007). Antes de iniciar nas artes dramáticas, Freeman pensou em concretizar seu sonho de criança, 
            de se tornar piloto. De 1955 a 1969, logo após formar-se no Los Angeles Community College, ele conseguiu chegar 
            à Força Aérea Americana - todavia, nunca como piloto, e sim como mecânico. Iniciando sua carreira nos palcos na década de 1960, 
            conseguiu participar de uma série de papéis, tanto em grandes espetáculos quanto nos circuitos alternativos de Nova York. 
            Mas Freeman se tornou conhecido na mídia americana por meio de papéis em novelas e filmes para televisão.
			Outros créditos do ator incluem Armação Perigosa (1987), Menina de Ouro (2004), Um Sonho de Liberdade (1994), 
            Batman Begins (2005), Batman - O Cavaleiro Das Trevas (2008), Batman - O Cavaleiro das Trevas Ressurge (2012), 
            Antes de Partir (2007) e Invictus (2009), além de fornecer narração para filmes como o documentário 
            vencedor do Oscar A Marcha dos Pingüins (2005).",
        2
    );

select tbl_atores.id, tbl_atores.nome, tbl_sexo.sexo, tbl_atores.foto_ator, 
        tbl_atores.dt_nasc, tbl_atores.dt_falec, tbl_atores.sobre, tbl_nacionalidades.nacionalidade, tbl_nacionalidades.pais_origem
				from tbl_sexo left join tbl_atores on tbl_sexo.id = tbl_atores.id_sexo 
					inner join tbl_nacionalidades_ator on tbl_atores.id = tbl_nacionalidades_ator.id_ator
						inner join tbl_nacionalidades on tbl_nacionalidades.id = tbl_nacionalidades_ator.id_nacionalidade 
							where tbl_atores.id > 0;

create table tbl_diretores(
	id int not null auto_increment primary key,
	nome varchar(200) not null,
    foto_diretor varchar(300) not null,
    dt_nasc date not null,
    dt_falec date,
    sobre text,
    id_sexo int,
    foreign key (id_sexo) references tbl_sexo(id)
);

create table tbl_nacionalidades(
	id int not null auto_increment primary key,
	pais_origem varchar(100) not null,
    nacionalidade varchar(100) not null
);

insert into tbl_nacionalidades (pais_origem, nacionalidade) values
("Afeganistão", "Afegão"),
("Andorra", "Andorrano"),
("Angola", "Angolano"),
("Antígua e Barbuda", "Antiguano"),
("Argélia", "Argelino"),
("Argentina", "Argentino"),
("Armênia", "Armênio"),
("Austrália", "Australiano"),
("Áustria", "Austríaco"),
("Azerbaijão", "Azeri"),
("Bahamas", "Bahamense"),
("Bangladesh", "Bangladês"),
("Barbados", "Barbadiano"),
("Barém", "Baremita"),
("Bielorrússia", "Bielorrusso"),
("Bélgica", "Belga"),
("Belize", "Belizenho"),
("Benim", "Beninense"),
("Bolívia", "Boliviano"),
("Bósnia e Herzegovina", "Bósnio"),
("Botsuana", "Bechuano"),
("Brasil", "Brasileiro"),
("Brunei", "Bruneano"),
("Bulgária", "Búlgaro"),
("BurkinaFaso", "Burquinense"),
("Burundi", "Burundês"),
("Butão", "Butanense"),
("Cabo Verde", "Cabo-verdiano"),
("Camarões", "Camaronense"),
("Camboja", "Cambojano"),
("Canadá", "Canadense"),
("República Centro-Africana", "Centroafricano"),
("Chade", "Chadiano"),
("China", "Chinês"),
("Chile", "Chileno"),
("Ilhas Cook", "Cookiano"),
("Colômbia", "Colombiano"),
("Comores", "Comoriano"),
("Costa Rica", "Costa-riquenho"),
("Croácia", "Croata"),
("Cuba", "Cubano"),
("Chipre", "Cipriota"),
("República Tcheca", "Tcheco"),
("República Democrática do Congo", "Congolense"),
("Dinamarca", "Dinamarquês"),
("Djibuti", "Djibutiense"),
("Dominica", "Dominiquense"),
("República Dominicana", "Dominicano"),
("Timor Leste", "Timorense"),
("Equador", "Equatoriano"),
("Egito", "Egípcio"),
("El Salvador", "Salvadorenho"),
("Inglaterra", "Inglês"),
("Guiné Equatorial", "Guinéu-equatoriano"),
("Eritreia", "Eritreu"),
("Estônia", "Estoniano"),
("Fiji", "Fijiano"),
("Finlândia", "Finlandês"),
("França", "Francês"),
("Gabão", "Gabonense"),
("Gâmbia", "Gambiano"),
("Geórgia", "Geórgico"),
("Alemanha", "Alemão"),
("Granada", "Granadino"),
("Grécia", "Grego"),
("Guatemala", "Guatemalteco"),
("Guiné", "Guineano"),
("GuinéBissau", "Guineense"),
("Guiana", "Guianense"),
("Haiti", "Haitiano"),
("Holanda", "Holandês"),
("Honduras", "Hondurenho"),
("Hungria", "Húngaro"),
("Islândia", "Islandês"),
("Índia", "Indiano"),
("Indonésia", "Indonésio"),
("Irã", "Iraniano"),
("Irlanda", "Irlandês"),
("Israel", "Israelita"),
("Itália", "Italiano"),
("Costa do Marfim", "Costa-marfinense"),
("Jamaica", "Jamaicano"),
("Japão", "Japonês"),
("Jordânia", "Jordão"),
("Cazaquistão", "Cazaque"),
("Quênia", "Queniano"),
("Quiribati", "I-quiribatiano"),
("Quirguistão", "Quirguistanês"),
("Kuwait", "Kuwaitiano"),
("Laos", "Laosiano"),
("Letônia", "Letoniano"),
("Líbano", "Libanês"),
("Lesoto", "Lesotiano"),
("Libéria", "Liberiano"),
("Liechtenstein", "Liechtensteinense"),
("Lituânia", "Lituano"),
("Luxemburgo", "Luxemburguês"),
("Líbia", "Líbio"),
("Macedônia", "Macedônio"),
("Madagascar", "Madagascarense"),
("Malásia", "Malaio"),
("Malaui", "Malauiano"),
("Maldivas", "Maldivo"),
("Máli", "Maliano"),
("Malta", "Maltês"),
("Maurício", "Mauriciano"),
("Mauritânia", "Mauritano"),
("Ilhas Marshall", "Marshallino"),
("Estados Federados da Micronésia", "Micronésio"),
("México", "Mexicano"),
("Marrocos", "Marroquino"),
("Moldavia", "Moldávio"),
("Mônaco", "Monegasco"),
("Mongólia", "Mongol"),
("Montenegro", "Montenegrino"),
("Moçambique", "Moçambicano"),
("Myanmar", "Birmanês"),
("Namíbia", "Namibiano"),
("Nauru", "Nauruano"),
("Nepal", "Nepalês"),
("Nova Zelândia", "Neozelandês"),
("Nicarágua", "Nicaraguense"),
("Níger", "Nigerino"),
("Nigéria", "Nigeriano"),
("Niue", "Niuano"),
("Coréia do Norte", "Norte-coreano"),
("Noruega", "Norueguês"),
("Omã", "Omanense"),
("Palestina", "Palestino"),
("Paquistão", "Paquistanês"),
("Palau", "Palauense"),
("Panamá", "Panamenho"),
("Papua Nova Guiné", "Papuásio"),
("Paraguai", "Paraguaio"),
("Peru", "Peruano"),
("Philippines", "Filipino"),
("Polônia", "Polonês"),
("Portugal", "Português"),
("Catar", "Catarense"),
("Romênia", "Romeno"),
("Rússia", "Russo"),
("Ruanda", "Ruandês"),
("Samoa", "Samoano"),
("Santa Lúcia", "Santa-lucense"),
("São Cristóvão e Nevis", "São-cristovense"),
("São Marino", "São-marinense"),
("São Tomé e Príncipe", "São-tomense"),
("São Vicente e Granadinas", "São-vicentino"),
("Escócia", "Escocês"),
("Senegal", "Senegalense"),
("Sérvia", "Sérvio"),
("Seicheles", "Seichelense"),
("Serra Leoa", "Serra-leonês"),
("Singapura", "Singapurense"),
("Eslováquia", "Eslovaco"),
("Ilhas Salomão", "Salomônico"),
("Somália", "Somali"),
("África do Sul", "Sul–africano"),
("Coréia do Sul", "Coreano"),
("Sudão do Sul", "Sul-sudanense"),
("Espanha", "Espanhol"),
("Sri Lanka", "Srilankês"),
("Sudão", "Sudanense"),
("Suriname", "Surinamês"),
("Suazilândia", "Suazi"),
("Suécia", "Sueco"),
("Suíça", "Suíço"),
("Síria", "Sírio"),
("Tadiquistão", "Tajique"),
("Tanzânia", "Tanzaniano"),
("Tailândia", "Tailandês"),
("Togo", "Togolês"),
("Tonga", "Tonganês"),
("Trindade e Tobago", "Trinitário"),
("Tunísia", "Tunisiano"),
("Turcomenistão", "Turcomeno"),
("Turquia", "Turco"),
("Tuvalu", "Tuvaluano"),
("Ucrânia", "Ucraniano"),
("Uganda", "Ugandês"),
("Uruguai", "Uruguaio"),
("Emirados Árabes Unidos", "Árabe"),
("Reino Unido", "Britânico"),
("Estados Unidos", "Americano"),
("Usbequistão", "Uzbeque"),
("Vanuatu", "Vanuatuano"),
("Venezuela", "Venezuelano"),
("Vietnã", "Vietnamita"),
("País de Gales", "Galês"),
("Iêmen", "Iemenita"),
("Zâmbia", "Zambiano"),
("Zimbábue", "Zimbabueano");

create table tbl_nacionalidades_ator(
	id int not null auto_increment primary key,
	id_ator int,
    id_nacionalidade int,
    foreign key (id_ator) references tbl_atores(id),
    foreign key (id_nacionalidade) references tbl_nacionalidades(id)
);

insert into tbl_nacionalidades_ator(id_ator, id_nacionalidade)values
(1,184),
(2,184);

create table tbl_nacionalidades_diretor(
	id int not null auto_increment primary key,
	id_diretor int,
    id_nacionalidade int,
    foreign key (id_diretor) references tbl_diretores (id),
    foreign key (id_nacionalidade) references tbl_nacionalidades (id)
);

create table tbl_filmes(
    id int not null auto_increment primary key,
    nome varchar(100) not null,
    sinopse text not null,
    duracao time not null,
    data_lancamento date not null,
    data_relancamento date,
    foto_capa varchar(300) not null,
    valor_unitario float,
    id_classificacao int not null,
    unique key(id),
    unique index(id),
    foreign key (id_classificacao) references tbl_classificacoes (id)
);

create table tbl_filmes_ator(
	id int not null auto_increment primary key,
    id_ator int,
    id_filme int,
	foreign key (id_filme) references tbl_filmes (id),
    foreign key (id_ator) references tbl_atores(id)
);

create table tbl_filmes_diretor(
	id int not null auto_increment primary key,
    id_diretor int,
    id_filme int,
	foreign key (id_filme) references tbl_filmes (id),
    foreign key (id_diretor) references tbl_diretores(id)
);

create table tbl_genero_filme(
	id int not null auto_increment primary key,
	id_genero int,
    id_filme int,
    foreign key (id_genero) references tbl_generos (id),
    foreign key (id_filme) references tbl_filmes (id)
);

insert into
    tbl_filmes(
        nome,
        sinopse,
        duracao,
        data_lancamento,
        data_relancamento,
        foto_capa,
        valor_unitario,
        id_classificacao
    )
values
    (
        "O Poderoso Chefão",
        "Don Vito Corleone (Marlon Brando) é o chefe de uma 'família' de Nova York que está feliz, pois Connie (Talia Shire), sua filha, se casou com Carlo (Gianni Russo). Porém, durante a festa, Bonasera (Salvatore Corsitto) é visto no escritório de Don Corleone pedindo 'justiça', vingança na verdade contra membros de uma quadrilha, que espancaram barbaramente sua filha por ela ter se recusado a fazer sexo para preservar a honra. Vito discute, mas os argumentos de Bonasera o sensibilizam e ele promete que os homens, que maltrataram a filha de Bonasera não serão mortos, pois ela também não foi, mas serão severamente castigados. Vito porém deixa claro que ele pode chamar Bonasera algum dia para devolver o 'favor'. Do lado de fora, no meio da festa, está o terceiro filho de Vito, Michael (Al Pacino), um capitão da marinha muito decorado que há pouco voltou da 2ª Guerra Mundial. Universitário educado, sensível e perceptivo, ele quase não é notado pela maioria dos presentes, com exceção de uma namorada da faculdade, Kay Adams (Diane Keaton), que não tem descendência italiana mas que ele ama. Em contrapartida há alguém que é bem notado, Johnny Fontane (Al Martino), um cantor de baladas românticas que provoca gritos entre as jovens que beiram a histeria. Don Corleone já o tinha ajudado, quando Johnny ainda estava em começo de carreira e estava preso por um contrato com o líder de uma grande banda, mas a carreira de Johnny deslanchou e ele queria fazer uma carreira solo. Por ser seu padrinho Vito foi procurar o líder da banda e ofereceu 10 mil dólares para deixar Johnny sair, mas teve o pedido recusado. Assim, no dia seguinte Vito voltou acompanhado por Luca Brasi (Lenny Montana), um capanga, e após uma hora ele assinou a liberação por apenas mil dólares, mas havia um detalhe: nas 'negociações' Luca colocou uma arma na cabeça do líder da banda. Agora, no meio da alegria da festa, Johnny quer falar algo sério com Vito, pois precisa conseguir o principal papel em um filme para levantar sua carreira, mas o chefe do estúdio, Jack Woltz (John Marley), nem pensa em contratá-lo. Nervoso, Johnny começa a chorar e Vito, irritado, o esbofeteia, mas promete que ele conseguirá o almejado papel. Enquanto a festa continua acontecendo, Don Corleone comunica a Tom Hagen (Robert Duvall), seu filho adotivo que atua como conselheiro, que Carlo terá um emprego mas nada muito importante, e que os 'negócios' não devem ser discutidos na sua frente. Os verdadeiros problemas começam para Vito quando Sollozzo (Al Lettieri), um gângster que tem apoio de uma família rival, encabeçada por Phillip Tattaglia (Victor Rendina) e seu filho Bruno (Tony Giorgio). Sollozzo, em uma reunião com Vito, Sonny e outros, conta para a família que ele pretende estabelecer um grande esquema de vendas de narcóticos em Nova York, mas exige permissão e proteção política de Vito para agir. Don Corleone odeia esta idéia, pois está satisfeito em operar com jogo, mulheres e proteção, mas isto será apenas a ponta do iceberg de uma mortal luta entre as 'famílias'.",
        "2:55:00",
        "1972-03-24",
        "2022-02-24",
        "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/90/93/20/20120876.jpg",
        32.99,
        4
    ),
    (
        "A Lista de Schindler",
        "A inusitada história de Oskar Schindler (Liam Neeson), um sujeito oportunista, sedutor, 'armador', simpático, comerciante no mercado negro, mas, acima de tudo, um homem que se relacionava muito bem com o regime nazista, tanto que era membro do próprio Partido Nazista (o que não o impediu de ser preso algumas vezes, mas sempre o libertavam rapidamente, em razão dos seus contatos). No entanto, apesar dos seus defeitos, ele amava o ser humano e assim fez o impossível, a ponto de perder a sua fortuna mas conseguir salvar mais de mil judeus dos campos de concentração.",
        "3:15:00",
        "1993-12-31",
        "2019-05-01",
        "https://br.web.img3.acsta.net/c_310_420/pictures/19/04/10/19/44/2904073.jpg",
        27.99,
        5
    ),(
        "A Forma da Água",
        "Década de 60. Em meio aos grandes conflitos políticos e transformações sociais dos Estados Unidos da Guerra Fria, a muda Elisa (Sally Hawkins), zeladora em um laboratório experimental secreto do governo, se afeiçoa a uma criatura fantástica mantida presa e maltratada no local. Para executar um arriscado e apaixonado resgate ela recorre ao melhor amigo Giles (Richard Jenkins) e à colega de turno Zelda (Octavia Spencer).",
        "2:03:00",
        "2018-02-01",
        null,
        "https://br.web.img3.acsta.net/c_310_420/pictures/17/11/28/18/40/3044833.jpg",
        17.99,
        5
    );

show tables;

select *from tbl_classificacoes where sigla like '%L%';

select *from tbl_generos where nome LIKE '%ação%';

select tbl_filmes.id, tbl_filmes.nome, tbl_filmes.sinopse, tbl_filmes.duracao, 
		tbl_filmes.data_lancamento, tbl_filmes.data_relancamento, tbl_filmes.foto_capa, 
			tbl_filmes.valor_unitario, tbl_classificacoes.sigla, tbl_classificacoes.classificacao, 
				tbl_classificacoes.legenda, tbl_classificacoes.imagem from tbl_filmes inner join tbl_classificacoes 
					on tbl_filmes.id_classificacao = tbl_classificacoes.id where tbl_filmes.id > 0 order by id;


delete from tbl_filmes where id = 0;
select foto_capa from tbl_filmes where id > 0;
select *from tbl_filmes where nome like '%Forma%';
select id from tbl_filmes order by id limit 1;
select cast(last_insert_id() as decimal) as id from tbl_filmes limit 1;
select cast(id as decimal) as id from tbl_filmes order by id desc limit 1;
update tbl_filmes set nome = "Julius" where id=9;
select *from tbl_filmes where id=9;
update tbl_filmes set nome = "Julius", sinopse = "Será que vai funcionar", duracao = "02:03:00", data_lancamento="2022-08-25", data_relancamento="2022-08-25", foto_capa="https://i.pinimg.com/736x/d2/33/a4/d233a42eb8ab9c98d82bb019d230b354.jpg", valor_unitario = "20" where id=3;
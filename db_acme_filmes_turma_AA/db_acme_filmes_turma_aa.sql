create database db_acme_filmes_turma_aa_vidal;

use db_acme_filmes_turma_aa_vidal;

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
    ("Crime"),
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
        "Criado numa família de classe média, o jovem Will Smith, mesmo com altas notas na escola e um futuro acadêmico promissor, preferiu abandonar os estudos e investir na carreira de rapper, apresentando-se com um amigo sob o nome de 'Fresh Prince'. O duo 'DJ Jazzy Jeff and the Fresh Prince' rapidamente conquistou o EUA, com diversos hits que passavam nas rádios, como 'Summertime' e 'Parents Just Don’t Understand'. Milionário aos 20 anos de idade, Smith gastou sua fortuna em carros, casas e joias, beirando a falência antes do 25° aniversário. Em 1989, o produtor Benny Medina mudou sua carreira ao propor a criação de um seriado de televisão baseado na sua vida: um garoto dos bairros negros que teria vida nova na rica região de Beverly Hills. Smith aceitou, e com a aprovação da rede NBC, a série Um Maluco no Pedaço (1990) durou seis temporadas, e transformou o rapper em ator. Ele rapidamente aceitou as propostas de atuar no cinema, como no drama Seis Graus de Separação (1993), que chamou a atenção da crítica ao seu talento dramático. Seu primeiro grande sucesso de bilheteria foi Bad Boys (1995), que provou sua capacidade de estrelar grandes filmes de ação. Assim, vários diretores renomados apostaram na imagem carismática de Smith, como Roland Emmerich em Independence Day (1996), Barry Sonnenfeld em Homens de Preto (1997) e Tony Scott em Inimigo do Estado (1998). Todos os filmes obtiveram um grande sucesso de público. Com a rápida notoriedade, o ator foi convidado a ser o protagonista de Matrix, mas Smith preferiu recusar o convite e investir na aventura cômica As Loucas Aventuras de James West (1999). Este talvez tenha sido o maior fracasso de sua carreira, um arrependimento admitido pelo próprio ator. Desde então, com maior cuidado nas escolhas, Smith tornou-se o único ator da história a acumular oito filmes consecutivos com bilheteria superior a 100 milhões de dólares. Ele é sempre citado nas listas especializadas como um dos atores mais rentáveis de Hollywood. Paralelamente, ele também investe na carreira de produtor e produtor executivo, principalmente dos filmes em que estrela. Sua longa série de sucessos inclui gêneros variados, como os dramas Ali (2001) e À Procura da Felicidade (2006), pelos quais ele foi indicado duas vezes ao Oscar, o filme de ação Bad Boys II (2003), as ficções científicas Homens de Preto II (2002) e Eu Sou a Lenda (2007), a comédia Hitch - Conselheiro Amoroso (2005) e a animação O Espanta Tubarões (2004). Desde o drama Sete Vidas (2008), Will Smith tem se consagrado em continuações de franquias de sucesso, como Homens de Preto III (2012), Bad Boys III (2013) além do filme de ficção científica dirigido por M. Night Shyamalan (O Sexto Sentido), intitulado Depois da Terra (2013). Will Smith se casou com a também atriz Jada Koren Pinkett em 1997. Juntos, eles têm dois filhos: Jaden Christopher Syre Smith (nascido em 1998), sua co-estrela em À Procura da Felicidade (2006) e Depois da Terra (2013), e Willow Camille Reign Smith (nascida em 2000), que apareceu como sua filha em Eu Sou a Lenda (2007). Smith e seu irmão Harry possuem a Treyball Development Inc., uma empresa com sede em Beverly Hills. Ele mora em Los Angeles, Califórnia, com sua família. O ator foi citado na lista dos '40 mais ricos' da Fortune Magazine, dos 40 americanos mais ricos com menos de 40 anos.",
        2
    ),
	(
		"Morgan Freeman",
        "https://image.tmdb.org/t/p/w500//jPsLqiYGSofU4s6BjrxnefMfabb.jpg",
        "1937-06-01",
        "Morgan Freeman é um premiado ator, produtor, narrador e cineasta norte-americano. Nascido em Memphis, Tennessee, em 1 de junho de 1937, ele passeou por diversos gêneros de filmes, sendo particularmente reconhecido por sua voz marcante. Freeman recebeu vários prêmios ao longo de sua carreira, incluindo um Oscar, um Globo de Ouro e um Screen Actors Guild Award. Ele é mais conhecido por seus trabalhos em Conduzindo Miss Daisy (1989), Tempo de Glória (1989), Robin Hood - O Príncipe dos Ladrões (1991), Os Imperdoáveis (1992), Seven - Os Sete Crimes Capitais(1995), Todo Poderoso(2003) e A Volta do Todo Poderoso (2007). Antes de iniciar nas artes dramáticas, Freeman pensou em concretizar seu sonho de criança, de se tornar piloto. De 1955 a 1969, logo após formar-se no Los Angeles Community College, ele conseguiu chegar à Força Aérea Americana - todavia, nunca como piloto, e sim como mecânico. Iniciando sua carreira nos palcos na década de 1960, conseguiu participar de uma série de papéis, tanto em grandes espetáculos quanto nos circuitos alternativos de Nova York. Mas Freeman se tornou conhecido na mídia americana por meio de papéis em novelas e filmes para televisão. Outros créditos do ator incluem Armação Perigosa (1987), Menina de Ouro (2004), Um Sonho de Liberdade (1994), Batman Begins (2005), Batman - O Cavaleiro Das Trevas (2008), Batman - O Cavaleiro das Trevas Ressurge (2012), Antes de Partir (2007) e Invictus (2009), além de fornecer narração para filmes como o documentário vencedor do Oscar A Marcha dos Pingüins (2005).",
        2
    ),
	(
		"Willard Christopher Smith Jr.",
        "https://br.web.img3.acsta.net/c_310_420/pictures/17/02/08/16/50/452749.jpg",
        "1968-09-25",
        "Criado numa família de classe média, o jovem Will Smith, mesmo com altas notas na escola e um futuro acadêmico promissor, preferiu abandonar os estudos e investir na carreira de rapper, apresentando-se com um amigo sob o nome de 'Fresh Prince'. O duo 'DJ Jazzy Jeff and the Fresh Prince' rapidamente conquistou o EUA, com diversos hits que passavam nas rádios, como 'Summertime' e 'Parents Just Don’t Understand'. Milionário aos 20 anos de idade, Smith gastou sua fortuna em carros, casas e joias, beirando a falência antes do 25° aniversário. Em 1989, o produtor Benny Medina mudou sua carreira ao propor a criação de um seriado de televisão baseado na sua vida: um garoto dos bairros negros que teria vida nova na rica região de Beverly Hills. Smith aceitou, e com a aprovação da rede NBC, a série Um Maluco no Pedaço (1990) durou seis temporadas, e transformou o rapper em ator. Ele rapidamente aceitou as propostas de atuar no cinema, como no drama Seis Graus de Separação (1993), que chamou a atenção da crítica ao seu talento dramático. Seu primeiro grande sucesso de bilheteria foi Bad Boys (1995), que provou sua capacidade de estrelar grandes filmes de ação. Assim, vários diretores renomados apostaram na imagem carismática de Smith, como Roland Emmerich em Independence Day (1996), Barry Sonnenfeld em Homens de Preto (1997) e Tony Scott em Inimigo do Estado (1998). Todos os filmes obtiveram um grande sucesso de público. Com a rápida notoriedade, o ator foi convidado a ser o protagonista de Matrix, mas Smith preferiu recusar o convite e investir na aventura cômica As Loucas Aventuras de James West (1999). Este talvez tenha sido o maior fracasso de sua carreira, um arrependimento admitido pelo próprio ator. Desde então, com maior cuidado nas escolhas, Smith tornou-se o único ator da história a acumular oito filmes consecutivos com bilheteria superior a 100 milhões de dólares. Ele é sempre citado nas listas especializadas como um dos atores mais rentáveis de Hollywood. Paralelamente, ele também investe na carreira de produtor e produtor executivo, principalmente dos filmes em que estrela. Sua longa série de sucessos inclui gêneros variados, como os dramas Ali (2001) e À Procura da Felicidade (2006), pelos quais ele foi indicado duas vezes ao Oscar, o filme de ação Bad Boys II (2003), as ficções científicas Homens de Preto II (2002) e Eu Sou a Lenda (2007), a comédia Hitch - Conselheiro Amoroso (2005) e a animação O Espanta Tubarões (2004). Desde o drama Sete Vidas (2008), Will Smith tem se consagrado em continuações de franquias de sucesso, como Homens de Preto III (2012), Bad Boys III (2013) além do filme de ficção científica dirigido por M. Night Shyamalan (O Sexto Sentido), intitulado Depois da Terra (2013). Will Smith se casou com a também atriz Jada Koren Pinkett em 1997. Juntos, eles têm dois filhos: Jaden Christopher Syre Smith (nascido em 1998), sua co-estrela em À Procura da Felicidade (2006) e Depois da Terra (2013), e Willow Camille Reign Smith (nascida em 2000), que apareceu como sua filha em Eu Sou a Lenda (2007). Smith e seu irmão Harry possuem a Treyball Development Inc., uma empresa com sede em Beverly Hills. Ele mora em Los Angeles, Califórnia, com sua família. O ator foi citado na lista dos '40 mais ricos' da Fortune Magazine, dos 40 americanos mais ricos com menos de 40 anos.",
        2
    ),
	(
		"Morgan Freeman",
        "https://image.tmdb.org/t/p/w500//jPsLqiYGSofU4s6BjrxnefMfabb.jpg",
        "1937-06-01",
        "Morgan Freeman é um premiado ator, produtor, narrador e cineasta norte-americano. Nascido em Memphis, Tennessee, em 1 de junho de 1937, ele passeou por diversos gêneros de filmes, sendo particularmente reconhecido por sua voz marcante. Freeman recebeu vários prêmios ao longo de sua carreira, incluindo um Oscar, um Globo de Ouro e um Screen Actors Guild Award. Ele é mais conhecido por seus trabalhos em Conduzindo Miss Daisy (1989), Tempo de Glória (1989), Robin Hood - O Príncipe dos Ladrões (1991), Os Imperdoáveis (1992), Seven - Os Sete Crimes Capitais(1995), Todo Poderoso(2003) e A Volta do Todo Poderoso (2007). Antes de iniciar nas artes dramáticas, Freeman pensou em concretizar seu sonho de criança, de se tornar piloto. De 1955 a 1969, logo após formar-se no Los Angeles Community College, ele conseguiu chegar à Força Aérea Americana - todavia, nunca como piloto, e sim como mecânico. Iniciando sua carreira nos palcos na década de 1960, conseguiu participar de uma série de papéis, tanto em grandes espetáculos quanto nos circuitos alternativos de Nova York. Mas Freeman se tornou conhecido na mídia americana por meio de papéis em novelas e filmes para televisão. Outros créditos do ator incluem Armação Perigosa (1987), Menina de Ouro (2004), Um Sonho de Liberdade (1994), Batman Begins (2005), Batman - O Cavaleiro Das Trevas (2008), Batman - O Cavaleiro das Trevas Ressurge (2012), Antes de Partir (2007) e Invictus (2009), além de fornecer narração para filmes como o documentário vencedor do Oscar A Marcha dos Pingüins (2005).",
        2
    );

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

insert into tbl_diretores  (nome, foto_diretor, dt_nasc, sobre, id_sexo)values
(
	"Martin Scorsese",
	"https://br.web.img3.acsta.net/c_310_420/pictures/15/08/04/21/29/580604.jpg",
	"1942-11-17",
	"Vindo de uma família de classe média de origem italiana, Martin Scorsese é um diretor e ator norte-americano conhecido por sua trajetória de destaque no cinema. Graduado em Cinema na Universidade de Nova York, aos 22 anos, seus curtas fizeram grande sucesso ainda na época de estudante, rendendo-lhe um convite do famoso produtor Roger Corman para dirigir Sexy e Marginal, em 1972 e ao longo da década de 70 Scorsese se estabeleceu como um dos grandes diretores de cinema dos Estados Unidos. O diretor se destacou com seus filmes de grande profundidade nos temas, histórias interessantes sobre a violência urbana, e seus personagens de bastante complexidade e perturbações diversas. Taxi Driver é a grande prova deste estilo, obra que lhe rendeu a Palma De Ouro. Já na década de 80, dirigiu, entre outros filmes, Touro Indomável, a biografia em preto e branco de Jake La Motta; a comédia de humor ácido Depois de Horas e um dos filmes mais polêmicos da história do cinema, A Última Tentação de Cristo. Na década de 90, ele volta a abordar o mundo da máfia com Os Bons Companheirose Cassino, além de ter dirigido duas refilmagens: Cabo do Medo e A Era da Inocência. Em 97, se envolve em outra grande polêmica ao filmar Kundun, drama político a favor do povo tibetano, que faz com que seja considerado persona non grata no território chinês. Além de trabalhar como diretor, também já participou em várias funções no cinema, entre elas supervisor de montagem do filme 'Woodstock' (1969) e ator em 'Quiz Show - A Verdade nos Bastidores' (1994).  Uma outra participação fora do comum foi ao dirigir o clipe musical de 'Bad', de Michael Jackson. Com sua estrela na calçada da fama, o grande diretor colecionou prêmios ao longa de sua carreira, possuindo 20 Oscar's, além de ter sido indicado mais de 90 vezes. Ele também venceu 23 prêmios da Acadêmia de Filmes Britânica e 11 Globos de Ouro. Recentemente, Martin Scorsese lançou o longa Assassinos da Lua das Flores, com Leonardo DiCaprio e Robert De Niro.",
	2
),
(
	"Steven Spielberg",
	"https://br.web.img3.acsta.net/c_310_420/pictures/16/05/17/11/39/453609.jpg",
	"1946-12-18",
	"Vindo de uma família judaica de classe média, Steven Spielberg ganhou sua primeira câmera com apenas 12 anos de idade. Aos 19, iniciou o curso de Cinema na Universidade da Califórnia, e aos 22 anos filmou Amblin, curta que possibilitou sua entrada na Universal Studios, onde passou a realizar vários filmes para a TV americana. O mais importante deles foi Encurralado, que se tornou um grande sucesso de crítica. Já trabalhando no cinema, Spielberg alcançou o sucesso com Tubarão e Contatos Imediatos do Terceiro Grau, em que inovava ao utilizar diversos efeitos especiais inovadores para a época, seguindo carreira com diversos sucessos de bilheteria, como E.T., O Extraterrestre, a trilogia Indiana Jones e Jurassic Park - O Parque dos Dinossauros. A partir de então, o drama passa a ser o gênero que o leva ao reconhecimento definitivo da crítica, ao retratar a 2ª Guerra Mundial em A Lista de Schindler e O Resgate do Soldado Ryan, ambos lhe rendendo estatuetas do Oscar. Seu trabalho no cinema vai além da direção, já tendo conquistado prêmios como produtor executivo e roteirista. Spielberg é hoje o mais influente diretor do cinema mundial e está atualmente entre as 3 maiores fortunas de Hollywood. É casado atualmente com a atriz Kate Capshaw e tem seis filhos, um deles com sua ex-esposa, a também atriz Amy Irving. Seu divórcio de Irving é o terceiro mais caro da história do mundo do entretenimento, perdendo para o de Michael Jordan e o do cantor Neil Diamond. Spielberg é um dos donos da DreamWorks SKG, um dos principais estúdios de Hollywood. Frequentemente utiliza a música de John Williams em seus filmes e é dono do trenó Rosebud original, do filme Cidadão Kane. Sempre envolvido com política e direitos humanos, o diretor realizou obras que abordam temas como racismo (A Cor Púrpura e Amistad) e terrorismo (Munique), e ainda tratou da Guerra Civil norte-americana em Lincoln.",
	2
),
(
	"Quentin Tarantino",
	"https://br.web.img3.acsta.net/c_310_420/pictures/19/03/19/17/22/2985063.jpg",
	"1963-03-27",
	"Nascido em 1963, Quentin Tarantino é um diretor norte-americano conhecido pelos filmes Kill Bill, Pulp Fiction e Bastardos Inglórios. Antes de ingressar sua carreira no cinema, foi gerente de uma videolocadora. Inclusive, o próprio Quentin Tarantino credita grande parte de sua criatividade ao fato de ter tido acesso a diversos filmes em seu trabalho, que lhe serviram de inspiração. Ele inicou sua carreira fazendo pontas em diversos filmes e também fazendo o Curso de Direção do Sundance Institute. Chegou a atuar em diversas séries da TV americana e escrever roteiros que se tornariam sucessos em Hollywood, como os de Amor à Queima-Roupa (1993), de Tony Scott, e Assassinos Por Natureza (1994), de Oliver Stone. Estreou na direção com uma produção independente, Cães de Aluguel (1992), que foi co-produzida pelo ator Harvey Keitel, figura constante em seus filmes. Logo em seguida, dirigiu seu maior sucesso até o momento, Pulp Fiction - Tempo de Violência (1994), que ressuscitou a carreira de John Travolta, deu novo impulso para Samuel L. Jackson e Uma Thurman e ainda rendeu a Tarantino sua primeira indicação ao Oscar, como melhor diretor. Além disso, levou para casa a estatueta de melhor roteiro original. Foi também produtor executivo do filme Parceiros do Crime (1994), do então estreante Roger Avary, seu parceiro no roteiro de 'Pulp Fiction', atuou em alguns filmes de destaque, como A Balada do Pistoleiro (1995) e Um Drink no Inferno (1996) e ainda dirigiu um dos episódios da comédia Grand Hotel(1995). Já em 1997, Tarantino volta a dirigir sozinho um longa-metragem, com Jackie Brown, adaptação de um famoso livro do escritor americano Elmore Leonard. Em sua curta carreira como cineasta, os filmes de Quentin Tarantino ficaram marcados por falar do submundo, mesclando sempre doses de humor e violência. Os rumores de ter trabalhado nos filmes A Hora dos Mortos-Vivos e Rei Lear foi apenas uma forma de Tarantino aumentar seu currículo indevidamente, mas o erro acabou indo para em vários livros especializados de cinema. Com seu estilo ágil e conteúdo violento, Tarantino se tornou um dos diretores mais proeminentes de Hollywood, lançando várias produções de sucesso, tanto de crítica quanto de público. Ao todo, ele conquistou oito indicações ao Oscar, ganhando duas vezes como roteirista por Pulp Fiction e Django Livre.",
	2
),
(
	"Christopher Nolan",
	"https://br.web.img3.acsta.net/c_310_420/pictures/15/02/26/15/33/118611.jpg",
	"1970-07-30",
	"Com apenas sete anos de idade, Christopher Nolan já se arriscava por trás das câmeras. Utilizando-se da câmera Super 8 do pai, ele realizou vários pequenos filmes estrelados por seus brinquedos. A vontade de dirigir não passou e ele acabou se tornando um importante realizador. Formou-se em literatura na Universidade de Londres, na mesma época em que começou a realizar filmes em 16mm. Seu curta 'Larceny' foi exibido no Festival de Cinema de Cambridge em 1996. Nolan estreou na direção com Following (1998), mas foi Amnésia (2000) que chamou a atenção da grande público, abrindo seu caminho para o sucesso em Hollywood. Na sequência, comandou Al Pacino, Robin Williams e Hilary Swank em Insônia (2002). Em 2005, dirigiu o filme que mudou para sempre sua história: Batman Begins. Ele investiu em um Homem-Morcego mais sombrio e realista, o que ficou ainda mais claro na continuação, Batman - O Cavaleiro das Trevas. O segundo longa rendeu um Oscar póstumo para Heath Ledger, que brilhou na pele do vilão Coringa. Com O Cavaleiro das Trevas Ressurge, fecha sua trilogia sobre o herói. Em um período 'entre-Batmans' realizou A Origem e chamou a atenção pela criatividade e pela complexidade narrativa. O filme arrecadou mais de US$ 800 milhões em todo mundo e conquistou estatuetas no Oscar.",
	2
);


create table tbl_nacionalidades(
	id int not null auto_increment primary key,
	pais_origem varchar(100) not null,
    nacionalidade varchar(100) not null
);

insert into tbl_nacionalidades (pais_origem, nacionalidade) values
("Afeganistão", "Afegão"),
("África do Sul", "Sul–africano"),
("Alemanha", "Alemão"),
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
("Bélgica", "Belga"),
("Belize", "Belizenho"),
("Benim", "Beninense"),
("Bielorrússia", "Bielorrusso"),
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
("Catar", "Catarense"),
("Cazaquistão", "Cazaque"),
("Chade", "Chadiano"),
("Chile", "Chileno"),
("China", "Chinês"),
("Chipre", "Cipriota"),
("Colômbia", "Colombiano"),
("Comores", "Comoriano"),
("Coréia do Norte", "Norte-coreano"),
("Coréia do Sul", "Coreano"),
("Costa do Marfim", "Costa-marfinense"),
("Costa Rica", "Costa-riquenho"),
("Croácia", "Croata"),
("Cuba", "Cubano"),
("Dinamarca", "Dinamarquês"),
("Djibuti", "Djibutiense"),
("Dominica", "Dominiquense"),
("Egito", "Egípcio"),
("El Salvador", "Salvadorenho"),
("Emirados Árabes Unidos", "Árabe"),
("Equador", "Equatoriano"),
("Eritreia", "Eritreu"),
("Escócia", "Escocês"),
("Eslováquia", "Eslovaco"),
("Espanha", "Espanhol"),
("Estados Federados da Micronésia", "Micronésio"),
("Estados Unidos", "Americano"),
("Estônia", "Estoniano"),
("Fiji", "Fijiano"),
("Finlândia", "Finlandês"),
("França", "Francês"),
("Gabão", "Gabonense"),
("Gâmbia", "Gambiano"),
("Geórgia", "Geórgico"),
("Granada", "Granadino"),
("Grécia", "Grego"),
("Guatemala", "Guatemalteco"),
("Guiana", "Guianense"),
("Guiné Equatorial", "Guinéu-equatoriano"),
("Guiné", "Guineano"),
("GuinéBissau", "Guineense"),
("Haiti", "Haitiano"),
("Holanda", "Holandês"),
("Honduras", "Hondurenho"),
("Hungria", "Húngaro"),
("Iêmen", "Iemenita"),
("Ilhas Cook", "Cookiano"),
("Ilhas Marshall", "Marshallino"),
("Ilhas Salomão", "Salomônico"),
("Índia", "Indiano"),
("Indonésia", "Indonésio"),
("Inglaterra", "Inglês"),
("Irã", "Iraniano"),
("Irlanda", "Irlandês"),
("Islândia", "Islandês"),
("Israel", "Israelita"),
("Itália", "Italiano"),
("Jamaica", "Jamaicano"),
("Japão", "Japonês"),
("Jordânia", "Jordão"),
("Kuwait", "Kuwaitiano"),
("Laos", "Laosiano"),
("Lesoto", "Lesotiano"),
("Letônia", "Letoniano"),
("Líbano", "Libanês"),
("Libéria", "Liberiano"),
("Líbia", "Líbio"),
("Liechtenstein", "Liechtensteinense"),
("Lituânia", "Lituano"),
("Luxemburgo", "Luxemburguês"),
("Macedônia", "Macedônio"),
("Madagascar", "Madagascarense"),
("Malásia", "Malaio"),
("Malaui", "Malauiano"),
("Maldivas", "Maldivo"),
("Máli", "Maliano"),
("Malta", "Maltês"),
("Marrocos", "Marroquino"),
("Maurício", "Mauriciano"),
("Mauritânia", "Mauritano"),
("México", "Mexicano"),
("Moçambique", "Moçambicano"),
("Moldavia", "Moldávio"),
("Mônaco", "Monegasco"),
("Mongólia", "Mongol"),
("Montenegro", "Montenegrino"),
("Myanmar", "Birmanês"),
("Namíbia", "Namibiano"),
("Nauru", "Nauruano"),
("Nepal", "Nepalês"),
("Nicarágua", "Nicaraguense"),
("Níger", "Nigerino"),
("Nigéria", "Nigeriano"),
("Niue", "Niuano"),
("Noruega", "Norueguês"),
("Nova Zelândia", "Neozelandês"),
("Omã", "Omanense"),
("País de Gales", "Galês"),
("Palau", "Palauense"),
("Palestina", "Palestino"),
("Panamá", "Panamenho"),
("Papua Nova Guiné", "Papuásio"),
("Paquistão", "Paquistanês"),
("Paraguai", "Paraguaio"),
("Peru", "Peruano"),
("Philippines", "Filipino"),
("Polônia", "Polonês"),
("Portugal", "Português"),
("Quênia", "Queniano"),
("Quirguistão", "Quirguistanês"),
("Quiribati", "I-quiribatiano"),
("Reino Unido", "Britânico"),
("República Centro-Africana", "Centroafricano"),
("República Democrática do Congo", "Congolense"),
("República Dominicana", "Dominicano"),
("República Tcheca", "Tcheco"),
("Romênia", "Romeno"),
("Ruanda", "Ruandês"),
("Rússia", "Russo"),
("Samoa", "Samoano"),
("Santa Lúcia", "Santa-lucense"),
("São Cristóvão e Nevis", "São-cristovense"),
("São Marino", "São-marinense"),
("São Tomé e Príncipe", "São-tomense"),
("São Vicente e Granadinas", "São-vicentino"),
("Seicheles", "Seichelense"),
("Senegal", "Senegalense"),
("Serra Leoa", "Serra-leonês"),
("Sérvia", "Sérvio"),
("Singapura", "Singapurense"),
("Síria", "Sírio"),
("Somália", "Somali"),
("Sri Lanka", "Srilankês"),
("Suazilândia", "Suazi"),
("Sudão do Sul", "Sul-sudanense"),
("Sudão", "Sudanense"),
("Suécia", "Sueco"),
("Suíça", "Suíço"),
("Suriname", "Surinamês"),
("Tadiquistão", "Tajique"),
("Tailândia", "Tailandês"),
("Tanzânia", "Tanzaniano"),
("Timor Leste", "Timorense"),
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
("Usbequistão", "Uzbeque"),
("Vanuatu", "Vanuatuano"),
("Venezuela", "Venezuelano"),
("Vietnã", "Vietnamita"),
("Zâmbia", "Zambiano"),
("Zimbábue", "Zimbabueano");

create table tbl_nacionalidades_ator(
	id int not null auto_increment primary key,
	id_ator int not null,
    id_nacionalidade int not null,
    foreign key (id_ator) references tbl_atores(id),
    foreign key (id_nacionalidade) references tbl_nacionalidades(id)
);

insert into tbl_nacionalidades_ator(id_ator, id_nacionalidade)values
(1,60),
(2,60),
(3,60),
(4,60);

create table tbl_nacionalidades_diretor(
	id int not null auto_increment primary key,
	id_diretor int not null,
    id_nacionalidade int not null,
    foreign key (id_diretor) references tbl_diretores (id),
    foreign key (id_nacionalidade) references tbl_nacionalidades (id)
);

insert into tbl_nacionalidades_diretor(id_diretor, id_nacionalidade)values
(1,60),
(2,60),
(2,6),
(3,60),
(4,60);

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

create table tbl_filmes_ator(
	id int not null auto_increment primary key,
    id_ator int not null,
    id_filme int not null,
	foreign key (id_filme) references tbl_filmes (id),
    foreign key (id_ator) references tbl_atores(id)
);

insert into tbl_filmes_ator(id_ator, id_filme)values
(1,1),
(1,2),
(1,3),
(2,1),
(2,2),
(2,3),
(3,1),
(3,2),
(3,3),
(4,1),
(4,2),
(4,3);

create table tbl_filmes_diretor(
	id int not null auto_increment primary key,
    id_diretor int not null,
    id_filme int not null,
	foreign key (id_filme) references tbl_filmes (id),
    foreign key (id_diretor) references tbl_diretores(id)
);

insert into tbl_filmes_diretor(id_diretor, id_filme)values
(1,1),
(1,2),
(1,3),
(2,1),
(2,2),
(2,3),
(3,1),
(3,2),
(3,3),
(4,1),
(4,2),
(4,3);

create table tbl_genero_filme(
	id int not null auto_increment primary key,
	id_genero int not null,
    id_filme int not null,
    foreign key (id_genero) references tbl_generos (id),
    foreign key (id_filme) references tbl_filmes (id)
);

insert into tbl_genero_filme(id_genero, id_filme)values
(10, 1),
(24, 1),
(13, 2),
(20, 2),
(16, 3),
(27, 3);

show tables;

select *from tbl_classificacoes where sigla like '%L%';

select *from tbl_generos where nome LIKE '%ação%';

select tbl_filmes.id, tbl_filmes.nome, tbl_filmes.sinopse, tbl_filmes.duracao, 
		tbl_filmes.data_lancamento, tbl_filmes.data_relancamento, tbl_filmes.foto_capa, 
			tbl_filmes.valor_unitario, tbl_classificacoes.sigla, tbl_classificacoes.classificacao, 
				tbl_classificacoes.legenda, tbl_classificacoes.imagem from tbl_filmes inner join tbl_classificacoes 
					on tbl_filmes.id_classificacao = tbl_classificacoes.id where tbl_filmes.id > 0 order by id;


select tbl_filmes.id as id_filme, tbl_filmes.nome  as nome_filme, tbl_filmes.sinopse  as sinopse_filme, 
tbl_filmes.duracao  as duracao_filme, tbl_filmes.data_lancamento as filme_data_lancamento, 
tbl_filmes.data_relancamento  as filme_data_relancamento, tbl_filmes.foto_capa as filme_foto_capa, 
	tbl_filmes.valor_unitario as filme_valor_unitario, tbl_classificacoes.sigla as classificacoes_sigla, 
	tbl_classificacoes.classificacao, tbl_classificacoes.legenda as classificacoes_legenda, 
	tbl_classificacoes.imagem as classificacoes_imagem, tbl_generos.id as generos_id, 
		tbl_generos.nome as generos_nome, tbl_atores.id  as atores_id, tbl_atores.nome  as nome_atores, 
		tbl_atores.foto_ator as atores_foto, tbl_atores.dt_nasc as atores_data_nascimento, 
		tbl_atores.dt_falec as atores_data_falecimento, tbl_atores.sobre  as atores_sobre, 
			tbl_atores.id_sexo as atores_sexo_id, tbl_sexo.sexo as atores_sexo_nome, 
			tbl_nacionalidades_ator.id_nacionalidade as id_nacionalidade_atores, tbl_nacionalidades.nacionalidade, 
			tbl_nacionalidades.pais_origem, tbl_diretores.id as diretores_id, tbl_diretores.nome as nome_diretores, 
				tbl_diretores.foto_diretor as diretores_foto, tbl_diretores.dt_nasc as diretores_data_nascimento, 
				tbl_diretores.dt_falec as diretores_data_falecimento, tbl_diretores.sobre  as diretores_sobre, 
				tbl_diretores.id_sexo as diretores_sexo_id, tbl_sexo.sexo as diretores_sexo_nome, 
					tbl_nacionalidades_diretor.id_nacionalidade as id_nacionalidade_diretores, 
					tbl_nacionalidades.nacionalidade, tbl_nacionalidades.pais_origem from tbl_generos 
					inner join tbl_genero_filme on tbl_genero_filme.id_genero = tbl_generos.id
						inner join tbl_filmes on tbl_filmes.id = tbl_genero_filme.id_filme
						inner join tbl_filmes_diretor on tbl_filmes_diretor.id_filme = tbl_filmes.id
						inner join tbl_diretores on tbl_diretores.id = tbl_filmes_diretor.id_diretor
							inner join tbl_nacionalidades_diretor on tbl_nacionalidades_diretor.id_diretor = tbl_diretores.id
							inner join tbl_nacionalidades on tbl_nacionalidades.id = tbl_nacionalidades_diretor.id_nacionalidade
							inner join tbl_nacionalidades_ator on tbl_nacionalidades_ator.id_nacionalidade = tbl_nacionalidades.id
								inner join tbl_atores on tbl_atores.id = tbl_nacionalidades_ator.id_ator
								inner join tbl_sexo on tbl_sexo.id = tbl_atores.id_sexo
								inner join tbl_filmes_ator on tbl_filmes_ator.id_ator = tbl_atores.id
									inner join tbl_filmes as tbl_filmes_classificacoes on tbl_filmes.id = tbl_filmes_ator.id_filme
									inner join tbl_classificacoes on tbl_classificacoes.id = tbl_filmes_classificacoes.id_classificacao
									where tbl_filmes.id > 0 order by tbl_filmes.id;


select tbl_filmes.id as id_filme, tbl_filmes.nome  as nome_filme, tbl_filmes.sinopse  as sinopse_filme, 
tbl_filmes.duracao  as duracao_filme, tbl_filmes.data_lancamento as filme_data_lancamento, 
tbl_filmes.data_relancamento  as filme_data_relancamento, tbl_filmes.foto_capa as filme_foto_capa, 
tbl_filmes.valor_unitario as filme_valor_unitario, tbl_classificacoes.sigla as classificacoes_sigla, 
tbl_classificacoes.classificacao, tbl_classificacoes.legenda as classificacoes_legenda, 
tbl_classificacoes.imagem as classificacoes_imagem, tbl_generos.id as generos_id, 
tbl_generos.nome as generos_nome, tbl_atores.id  as atores_id, tbl_atores.nome  as nome_atores, 
tbl_atores.foto_ator as atores_foto, tbl_atores.id_sexo as atores_sexo_id, 
tbl_sexo.sexo as atores_sexo_nome, tbl_diretores.id as diretores_id, 
tbl_diretores.nome as nome_diretores, tbl_diretores.foto_diretor as diretores_foto, 
tbl_diretores.id_sexo as diretores_sexo_id, tbl_sexo.sexo as diretores_sexo_nome 
from tbl_generos inner join tbl_genero_filme on tbl_genero_filme.id_genero = tbl_generos.id
inner join tbl_filmes on tbl_filmes.id = tbl_genero_filme.id_filme
inner join tbl_filmes_diretor on tbl_filmes_diretor.id_filme = tbl_filmes.id
inner join tbl_diretores on tbl_diretores.id = tbl_filmes_diretor.id_diretor
inner join tbl_sexo on tbl_sexo.id = tbl_diretores.id_sexo
inner join tbl_atores on tbl_atores.id_sexo = tbl_sexo.id
inner join tbl_filmes_ator on tbl_filmes_ator.id_ator = tbl_atores.id
inner join tbl_filmes as tbl_filmes_classificacoes on tbl_filmes.id = tbl_filmes_ator.id_filme
inner join tbl_classificacoes on tbl_classificacoes.id = tbl_filmes_classificacoes.id_classificacao
where tbl_filmes.id > 0 order by tbl_filmes.id;

select tbl_atores.id, tbl_atores.nome, tbl_atores.foto_ator, tbl_atores.dt_nasc, tbl_atores.dt_falec, 
		tbl_atores.sobre, tbl_atores.id_sexo, tbl_sexo.sexo, tbl_nacionalidades_ator.id_nacionalidade, 
			tbl_nacionalidades.nacionalidade, tbl_nacionalidades.pais_origem
				from tbl_sexo left join tbl_atores on tbl_sexo.id = tbl_atores.id_sexo 
					inner join tbl_nacionalidades_ator on tbl_atores.id = tbl_nacionalidades_ator.id_ator
						inner join tbl_nacionalidades on tbl_nacionalidades.id = tbl_nacionalidades_ator.id_nacionalidade 
							where tbl_atores.id > 0 order by tbl_atores.id;

select tbl_diretores.id, tbl_diretores.nome, tbl_diretores.foto_diretor, tbl_diretores.dt_nasc, 
        tbl_diretores.dt_falec, tbl_diretores.sobre, tbl_diretores.id_sexo, tbl_sexo.sexo, tbl_nacionalidades_diretor.id_nacionalidade, 
			tbl_nacionalidades.nacionalidade, tbl_nacionalidades.pais_origem
				from tbl_sexo left join tbl_diretores on tbl_sexo.id = tbl_diretores.id_sexo 
					right join tbl_nacionalidades_diretor on tbl_diretores.id = tbl_nacionalidades_diretor.id_Diretor
						left join tbl_nacionalidades on tbl_nacionalidades.id = tbl_nacionalidades_diretor.id_nacionalidade 
							where tbl_diretores.id > 0 order by tbl_diretores.id;

delete from tbl_nacionalidades_ator where id_ator = 6;
delete from tbl_atores where id = 1;

delete from tbl_filmes where id = 1;
select foto_capa from tbl_filmes where id > 0;
select *from tbl_filmes where nome like '%Forma%';
select id from tbl_filmes order by id limit 1;
select cast(last_insert_id() as decimal) as id from tbl_filmes limit 1;
select cast(id as decimal) as id from tbl_filmes order by id desc limit 1;
update tbl_filmes set nome = "Julius" where id=9;
select *from tbl_filmes where id=9;
update tbl_filmes set nome = "Julius", sinopse = "Será que vai funcionar", duracao = "02:03:00", data_lancamento="2022-08-25", data_relancamento="2022-08-25", foto_capa="https://i.pinimg.com/736x/d2/33/a4/d233a42eb8ab9c98d82bb019d230b354.jpg", valor_unitario = "20" where id=3;
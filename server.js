const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
const { Op } = require('sequelize');
const Jogador = require('./model/jogador');

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set("view engine", "ejs");
app.set("views", "./views");

app.get('/', (req, res) => {
  res.send('Seja bem-vindo ao seu mundo FIFA! <br> /inserejogadores para cadastrar <br> /consultarjogador para consultar os jogadores, alterar e excluir!');
});

app.post('/insereJogadores', urlencodedParser, async (req, res) => {
  const jogadorData = req.body;

  try {
    const jogador = await Jogador.create({
      nome: jogadorData.nome,
      time: jogadorData.time,
      idade: jogadorData.idade,
      aceleracao: jogadorData.aceleracao,
      velocidadeSprint: jogadorData.velocidadeSprint,
      finalizacao: jogadorData.finalizacao,
      forcaChute: jogadorData.forcaChute,
      chutesLongos: jogadorData.chutesLongos,
      penaltis: jogadorData.penaltis,
      visao: jogadorData.visao,
      cruzamentos: jogadorData.cruzamentos,
      agilidade: jogadorData.agilidade,
      equilibrio: jogadorData.equilibrio,
      dribles: jogadorData.dribles,
    });

    console.log('Jogador cadastrado com sucesso:', jogador.toJSON());
    res.send('Jogador cadastrado com sucesso!');
  } catch (error) {
    console.error('Erro ao cadastrar jogador:', error);
    res.status(500).send('Erro ao cadastrar jogador');
  }
});

app.post('/jogadores', urlencodedParser, (req, res) => {
  const nomeFiltro = req.body.nome;
  const timeFiltro = req.body.time;

  Jogador.findOne({
    where: {
      nome: { [Op.like]: `%${nomeFiltro}%` },
      time: { [Op.like]: `%${timeFiltro}%` },
    },
  })
    .then(function (jogador) {
      if (jogador) {
        res.render('resultadoconsulta', { jogador: jogador });
      } else {
        res.send('Jogador não encontrado');
      }
    })
    .catch(function (erro) {
      res.send('Erro na consulta de jogadores: ' + erro);
    });
});


app.get('/insereJogadores', (req, res) => {
  res.render('cadastrojogador');
});

app.get('/consultarjogador', (req, res) => {
  res.render('consultajogador');
});

app.get("/alterarjogador",(req, res) => {
  var nomeJogador = req.query.nome;
  var timeJogador = req.query.time;

  Jogador.findOne({ where: { nome: nomeJogador, time: timeJogador } })
    .then(function (jogador) {
      if (jogador) {
        res.render("alterarjogador", { jogador: jogador });
      } else {
        res.send("Jogador não encontrado");
      }
    })
    .catch(function (erro) {
      res.send("Erro ao tentar alterar os dados do jogador!"
      );
    });
});

app.post("/alterandojogador", urlencodedParser, (req, res) => {
  var nomeJogador = req.body.nome;
  var timeJogador = req.body.time;
  var idadeJogador = req.body.idade;
  var aceleracaoJogador = req.body.aceleracao;
  var velocidadeSprintJogador = req.body.velocidadeSprint;
  var finalizacaoJogador = req.body.finalizacao;
  var forcaChuteJogador = req.body.forcaChute;
  var chutesLongosJogador = req.body.chutesLongos;
  var penaltisJogador = req.body.penaltis;
  var visaoJogador = req.body.visao;
  var cruzamentosJogador = req.body.cruzamentos;
  var agilidadeJogador = req.body.agilidade;
  var equilibrioJogador = req.body.equilibrio;
  var driblesJogador = req.body.dribles;
  Jogador.update(
    { 
      idade: idadeJogador,
      aceleracao: aceleracaoJogador,
      velocidadeSprint: velocidadeSprintJogador,
      finalizacao: finalizacaoJogador,
      forcaChute: forcaChuteJogador,
      chutesLongos: chutesLongosJogador,
      penaltis: penaltisJogador,
      visao: visaoJogador,
      cruzamentos: cruzamentosJogador,
      agilidade: agilidadeJogador,
      equilibrio: equilibrioJogador,
      dribles: driblesJogador
    },
    { where: { nome: nomeJogador, time: timeJogador } }
  )
    .then(function ([rowsUpdate]) {
      if (rowsUpdate === 0) {
        res.send("Jogador não encontrado");
      } else {
        res.send("Dados do jogador alterado com sucesso!");
      }
    })
    .catch(function (erro) {
      res.send("Erro ao atualizar os dados do jogador: " + erro);
    });
});

app.get("/excluirjogador", (req, res) => {
  var nomeJogador = req.query.nome;
  var timeJogador = req.query.time;

  Jogador.destroy({ where: { nome: nomeJogador, time: timeJogador } })
    .then(function (rowsDeleted) {
      if (rowsDeleted === 0) {
        res.send("Jogador não encontrado");
      } else {
        res.send("Jogador excluído com sucesso!");
      }
    })
    .catch(function (erro) {
      res.send("Erro ao excluir o jogador");
    });
});

app.listen(PORT, () => {
  console.log('Você está na porta 3000');
});
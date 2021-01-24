"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./style.css");
var close_svg_1 = require("../../assets/imagens/close.svg");
var settigs_svg_1 = require("../../assets/imagens/settigs.svg");
var react_router_dom_1 = require("react-router-dom");
function Panel() {
    var history = react_router_dom_1.useHistory();
    var _a = react_1.useState([]), medicos = _a[0], setMedicos = _a[1];
    var _b = react_1.useState(''), medicoNome = _b[0], setmedicoNome = _b[1];
    var _c = react_1.useState(''), botao = _c[0], setBotao = _c[1];
    var _d = react_1.useState(''), nome = _d[0], setNome = _d[1];
    var _e = react_1.useState(''), email = _e[0], setEmail = _e[1];
    var _f = react_1.useState(''), crm = _f[0], setCrm = _f[1];
    var _g = react_1.useState(''), senha = _g[0], setSenha = _g[1];
    var _h = react_1.useState(''), dataNascimento = _h[0], setData = _h[1];
    var _j = react_1.useState(''), teleFixo = _j[0], setTeleFixo = _j[1];
    var _k = react_1.useState(''), celular = _k[0], setCelular = _k[1];
    var _l = react_1.useState(''), cep = _l[0], setCep = _l[1];
    var _m = react_1.useState(''), logradouro = _m[0], setLogradouto = _m[1];
    var _o = react_1.useState(''), bairro = _o[0], setBairro = _o[1];
    var _p = react_1.useState(''), localidade = _p[0], setLocalidade = _p[1];
    var _q = react_1.useState(''), uf = _q[0], setUf = _q[1];
    var _r = react_1.useState(''), numero = _r[0], setNumero = _r[1];
    var _s = react_1.useState(false), showModal = _s[0], setShowModel = _s[1];
    var _t = react_1.useState([]), usuario = _t[0], setUsuario = _t[1];
    var _u = react_1.useState(false), status = _u[0], setStatus = _u[1];
    var _v = react_1.useState(''), id = _v[0], setId = _v[1];
    react_1.useEffect(function () {
        Listar();
    }, []);
    var Salvar = function () {
        var metodo = "";
        var url = "";
        if (status == false) {
            metodo = "PUT";
            url = "http://localhost:5000/api/Medico/" + id + "";
        }
        else if (status == true) {
            metodo = "POST";
            url = "http://localhost:5000/api/Medico";
        }
        var user = {
            Nome: nome,
            Email: email,
            Crm: crm,
            Senha: senha,
            DataNascimento: "1981-01-23T04:45:33.857Z",
            TelefoneFixo: teleFixo,
            TelefoneCelular: celular,
            Cep: cep,
            Logradouro: logradouro,
            Bairro: bairro,
            Localidade: localidade,
            Uf: uf,
            Numero: numero,
            IdTipoUsuario: 2,
            TbMedicosEspecialidades: [
                {
                    IdMedico: 2,
                    IdEspecialidade: 3
                }
            ]
        };
        console.log(JSON.stringify(user));
        fetch(url, {
            headers: {
                'Content-Type': 'application/json'
                //   authorization: 'Bearer ' + localStorage.getItem('Gcb-Caren-Token')
            },
            method: metodo,
            body: JSON.stringify(user)
        })
            .then(function () { return window.location.reload(); })["catch"](function (error) { return console.error(error); });
    };
    var Listar = function () {
        var url = "http://localhost:5000/api/Medico";
        fetch(url, {
            // headers: {
            //   authorization: 'Bearer ' + localStorage.getItem('Gcb-Caren-Token')
            //},
            method: 'GET'
        })
            .then(function (response) { return response.json(); })
            .then(function (dados) {
            setMedicos(dados);
            console.log(dados);
        })["catch"](function (error) { return console.error(error); });
    };
    var modal = function (id) {
        if (id !== null && id !== 0) {
            var url = "http://localhost:5000/api/Medico/" + id;
            fetch(url, {
                //headers: {
                //     authorization: 'Bearer ' + localStorage.getItem('Gcb-Caren-Token')
                //},
                method: 'get'
            })
                .then(function (response) { return response.json(); })
                .then(function (dados) {
                setUsuario(dados);
                setNome(dados.nome);
                setEmail(dados.email);
                setCrm(dados.crm);
                setSenha(dados.senha);
                setData(dados.dataNascimento);
                setTeleFixo(dados.telefoneFixo);
                setCelular(dados.telefoneCelular);
                setCep(dados.cep);
                setLogradouto(dados.logradouro);
                setBairro(dados.bairro);
                setLocalidade(dados.localidade);
                setUf(dados.uf);
                setNumero(dados.numero);
                setId(dados.id);
            })["catch"](function (err) {
                console.error(err);
            });
            setStatus(false);
            setBotao("Atualizar");
        }
        else {
            setBotao("Adicionar");
            setStatus(true);
            setNome('');
            setEmail('');
            setEmail('');
            setCrm('');
            setSenha('');
            setData('');
            setTeleFixo('');
            setCelular('');
            setCep('');
            setLogradouto('');
            setBairro('');
            setLocalidade('');
            setUf('');
            setNumero('');
        }
    };
    var viacep = function (num) {
        var url = "https://viacep.com.br/ws/" + num + "/json/";
        fetch(url, {
            method: 'GET'
        })
            .then(function (response) { return response.json(); })
            .then(function (dados) {
            setLogradouto(dados.logradouro);
            setBairro(dados.bairro);
            setLocalidade(dados.localidade);
            setUf(dados.uf);
        })["catch"](function (err) {
            console.error(err);
        });
    };
    var excluir = function (id) {
        var _a;
        var resposta = (_a = window.prompt("Digite 'excluir medico' para excluir esse médico(a):")) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        if (resposta == "excluir medico") {
            var url = "http://localhost:5000/api/Medico/" + id;
            fetch(url, {
                //headers: {
                //     authorization: 'Bearer ' + localStorage.getItem('Gcb-Caren-Token')
                //},
                method: 'DELETE'
            })
                .then(function () {
                Listar();
            })["catch"](function (err) {
                console.error(err);
            });
        }
    };
    function Buscar(nome) {
        if (medicos.length != 0) {
            var buscados = medicos.filter(function (item) { return item.nome.toUpperCase().includes(nome.toUpperCase()); });
            if (buscados != undefined)
                return buscados;
        }
        return medicos;
    }
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: "barra-cima" },
            react_1["default"].createElement("div", { className: "input-container" },
                react_1["default"].createElement("input", { value: medicoNome, onChange: function (e) { return setmedicoNome(e.target.value); }, className: "input-field", type: "text", placeholder: "Digite o nome do m\u00E9dico(a) para encontra-lo:", name: "usrnm" }),
                react_1["default"].createElement("i", { className: "fas fa-search icon" })),
            react_1["default"].createElement("button", { onClick: function () { modal(0); setShowModel(true); }, className: "btn" },
                "Adicionar m\u00E9dico(a)",
                react_1["default"].createElement("i", { className: "fas fa-plus icone" }))),
        react_1["default"].createElement("div", { className: "container" },
            react_1["default"].createElement("ul", { className: "responsive-table" },
                react_1["default"].createElement("li", { className: "table-header" },
                    react_1["default"].createElement("div", { className: "col col-1" }, "Nome do m\u00E9dico(a)"),
                    react_1["default"].createElement("div", { className: "col col-2" }, "CRM"),
                    react_1["default"].createElement("div", { className: "col col-3" }, "Ver mais"),
                    react_1["default"].createElement("div", { className: "col col-4" }, "Deletar")),
                Buscar(medicoNome).map(function (item) {
                    return (react_1["default"].createElement("li", { className: "table-row" },
                        react_1["default"].createElement("div", { className: "col col-1" }, item.nome),
                        react_1["default"].createElement("div", { className: "col col-2" }, item.crm),
                        react_1["default"].createElement("div", { className: "col col-3" },
                            react_1["default"].createElement("img", { className: "regular", src: settigs_svg_1["default"], onClick: function () { modal(item.id); setShowModel(true); }, alt: "configura\u00E7\u00F5es" })),
                        react_1["default"].createElement("div", { className: "col col-4" },
                            " ",
                            react_1["default"].createElement("img", { className: "regular", src: close_svg_1["default"], onClick: function () { return excluir(item.id); }, alt: "excluir m\u00E9dico" }))));
                }))),
        react_1["default"].createElement("div", { style: { display: showModal ? 'block' : 'none' } },
            react_1["default"].createElement("div", { id: "myModal", className: "modal" },
                react_1["default"].createElement("div", { className: "modal-content" },
                    react_1["default"].createElement("span", { onClick: function () { return setShowModel(false); }, className: "close" }, "\u00D7"),
                    react_1["default"].createElement("div", { className: "containerInputs" },
                        react_1["default"].createElement("form", { onSubmit: function (event) {
                                event.preventDefault();
                                Salvar();
                            } },
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement("input", { type: "text", onChange: function (e) { return setNome(e.target.value); }, maxLength: 120, value: nome, placeholder: "Nome" }),
                                react_1["default"].createElement("input", { type: "text", onChange: function (e) { return setCrm(e.target.value); }, maxLength: 7, value: crm, placeholder: "CRM" })),
                            react_1["default"].createElement("input", { type: "email", maxLength: 120, onChange: function (e) { return setEmail(e.target.value); }, value: email, placeholder: "E-mail" }),
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement("input", { type: "text", maxLength: 15, onChange: function (e) { return setTeleFixo(e.target.value); }, value: teleFixo, placeholder: "Telefone fixo" }),
                                react_1["default"].createElement("input", { type: "text", maxLength: 15, onChange: function (e) { return setCelular(e.target.value); }, value: celular, placeholder: "Telefone celular" })),
                            react_1["default"].createElement("div", { className: "form-pass" },
                                react_1["default"].createElement("input", { type: "password", maxLength: 120, onChange: function (e) { return setSenha(e.target.value); }, value: senha, placeholder: "Senha" }),
                                react_1["default"].createElement("input", { type: "date", onChange: function (e) { return setData(e.target.value); }, value: dataNascimento.toString().slice(0, 10) })),
                            react_1["default"].createElement("div", { className: "cep" },
                                react_1["default"].createElement("input", { type: "text", maxLength: 9, onChange: function (e) { viacep(e.target.value); setCep(e.target.value); }, value: cep, placeholder: "CEP" }),
                                react_1["default"].createElement("input", { type: "text", maxLength: 120, onChange: function (e) { return setLogradouto(e.target.value); }, value: logradouro, placeholder: "Logradouro" })),
                            react_1["default"].createElement("div", { className: "cep" },
                                react_1["default"].createElement("input", { type: "text", maxLength: 120, onChange: function (e) { return setBairro(e.target.value); }, value: bairro, placeholder: "Bairro" }),
                                react_1["default"].createElement("input", { type: "text", maxLength: 120, onChange: function (e) { return setLocalidade(e.target.value); }, value: localidade, placeholder: "Localidade" })),
                            react_1["default"].createElement("div", { className: "cep" },
                                react_1["default"].createElement("input", { type: "text", maxLength: 5, onChange: function (e) { return setUf(e.target.value); }, value: uf, placeholder: "UF" }),
                                react_1["default"].createElement("input", { type: "text", maxLength: 10, onChange: function (e) { return setNumero(e.target.value); }, value: numero, placeholder: "N\u00FAmero" })),
                            react_1["default"].createElement("button", null, botao))))))));
}
exports["default"] = Panel;

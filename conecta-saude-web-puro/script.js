// script.js

// --- Dados (equivalente ao info_saude.py) ---
// Já foram definidos e não precisam de mudança aqui
const usefulPhones = [
    "SAMU (Serviço de Atendimento Móvel de Urgência): 192",
    "Corpo de Bombeiros: 193",
    "Disque Saúde (Ministério da Saúde): 136",
    "Secretaria Municipal de Saúde SJM: (21) 2018-7458",
    "Delegacia de Polícia (Emergência): 190"
];

const sjmInfo = {
    farmacias: [
        {"nome": "Drogarias Pacheco", "endereco": "Av. Automóvel Clube, 2516 - Vilar dos Teles"},
        {"nome": "Drogaria Venancio", "endereco": "Rua Gessyr Gonçalves Fontes, 131 - Centro"},
        {"nome": "FarmaVita", "endereco": "Rua da Matriz, 50 - Centro"},
        {"nome": "Drogaria Popular SJM", "endereco": "Av. Dr. Arruda Negreiros, 786 - Centro"}
    ],
    hospitaisEPostos: [
        {"nome": "Hospital Municipal de São João de Meriti", "endereco": "Rua da Matriz, 780 - Centro"},
        {"nome": "UPA Jardim Íris", "endereco": "Rua Paraíso, s/n - Jardim Íris"},
        {"nome": "Clínica da Família", "endereco": "Rua Visconde de Barbacena, s/n - Agostinho Porto"},
        {"nome": "Policlínica da Vila Rosali", "endereco": "Rua Venda Velha, 540 - Vila Rosali"}
    ],
    postosVacinacao: [
        {"nome": "UBS Centro", "funcionamento": "Seg a Sex, 8h às 17h (verificar campanhas específicas)"},
        {"nome": "UBS Vilar dos Teles", "funcionamento": "Seg a Sex, 8h às 16h (consultar calendário atual)"},
        {"nome": "Clínica da Família Agostinho Porto", "funcionamento": "Sábados, 8h às 12h (durante campanhas específicas)"}
    ],
    dicasSaude: [
        "Beba pelo menos 2 litros de água por dia.",
        "Faça exercícios regularmente (pelo menos 30 minutos na maioria dos dias da semana).",
        "Mantenha uma alimentação equilibrada, rica em frutas, verduras e legumes.",
        "Evite a automedicação e procure um profissional de saúde ao sentir sintomas.",
        "Mantenha sua carteira de vacinação atualizada.",
        "Lave as mãos com frequência, especialmente antes das refeições e após usar o banheiro.",
        "Durma de 7 a 9 horas por noite para uma boa recuperação física e mental."
    ]
};

// Dados de exemplo para Pacientes, Médicos e Consultas (no mundo real viriam de um backend)
const pacientes = [
    { nome: "João Silva", idade: 35, cpf: "123.456.789-00" },
    { nome: "Maria Santos", idade: 28, cpf: "987.654.321-00" }
];
const medicos = [
    { nome: "Dra. Ana Costa", especialidade: "Clínica Geral", crm: "CRM/RJ 123456" },
    { nome: "Dr. Pedro Alves", especialidade: "Cardiologista", crm: "CRM/RJ 654321" }
];
const consultas = [
    { paciente: pacientes[0], medico: medicos[0], data: "2025-07-15", hora: "10:00" }
];


// --- Funções para Renderizar Componentes Reutilizáveis ---

function createInfoCard(title, items) {
    let itemsHtml = items.map(item => {
        if (typeof item === 'string') {
            return `<li><strong>${item}</strong></li>`;
        } else {
            // Verifica se endereco existe antes de adicionar o <br>
            return `<li><strong>${item.nome}</strong>${item.endereco ? '<br>' + item.endereco : ''}${item.funcionamento ? '<br>' + item.funcionamento : ''}</li>`;
        }
    }).join('');

    return `
        <div class="info-card">
            <h3>${title}</h3>
            <ul>
                ${itemsHtml}
            </ul>
        </div>
    `;
}

function createLocationButton() {
    return `
        <button class="location-button" onclick="handleLocateMe()">
            <i class="fas fa-map-marker-alt"></i> Minha Localização
        </button>
    `;
}

// Handler para o botão de localização
function handleLocateMe() {
    alert('Funcionalidade de localização em desenvolvimento!');
    // Em uma aplicação real, você usaria a Geolocation API aqui
    // navigator.geolocation.getCurrentPosition(...)
}
// Torna a função globalmente acessível para o onclick no HTML
window.handleLocateMe = handleLocateMe;


// --- Funções para Renderizar Páginas ---

function renderDashboardPage() {
    const mainContent = document.querySelector('.app-main-content');
    const numPacientes = pacientes.length;
    const numMedicos = medicos.length;
    const numConsultas = consultas.length;

    mainContent.innerHTML = `
        <div class="breadcrumbs">
            <i class="fas fa-home"></i> Dashboard
        </div>
        <h2><i class="fas fa-chart-line"></i> Dashboard Geral</h2>
        <div class="dashboard-cards">
            <div class="card">
                <h3>Total de Pacientes</h3>
                <p>${numPacientes}</p>
                <a href="#" class="internal-link" data-page="pacientes">Ver Pacientes</a>
            </div>
            <div class="card">
                <h3>Total de Médicos</h3>
                <p>${numMedicos}</p>
                <a href="#" class="internal-link" data-page="medicos">Ver Médicos</a>
            </div>
            <div class="card">
                <h3>Consultas Agendadas</h3>
                <p>${numConsultas}</p>
                <a href="#" class="internal-link" data-page="consultas">Ver Consultas</a>
            </div>
            <div class="card">
                <h3>Emergência</h3>
                <p>📞</p>
                <a href="#" class="internal-link" data-page="emergencia">Ver Telefones</a>
            </div>
        </div>
    `;
    attachInternalLinkListeners(); // Anexa listeners após renderizar
}

function renderPacientesPage() {
    const mainContent = document.querySelector('.app-main-content');
    mainContent.innerHTML = `
        <div class="breadcrumbs">
            <i class="fas fa-home"></i> Dashboard &gt; <i class="fas fa-user-injured"></i> Pacientes
        </div>
        <h2><i class="fas fa-user-injured"></i> Gerenciar Pacientes</h2>
        <div class="form-container">
            <h3>Cadastrar Novo Paciente</h3>
            <form id="paciente-form">
                <label for="paciente-nome">Nome Completo:</label>
                <input type="text" id="paciente-nome" required><br>
                <label for="paciente-idade">Idade:</label>
                <input type="number" id="paciente-idade" min="0" required><br>
                <label for="paciente-cpf">CPF (somente números):</label>
                <input type="text" id="paciente-cpf" pattern="[0-9]{11}" title="CPF deve conter 11 dígitos numéricos" required><br>
                <button type="submit"><i class="fas fa-user-plus"></i> Cadastrar Paciente</button>
            </form>
        </div>
        <h3>Lista de Pacientes Cadastrados</h3>
        <ul class="list-container" id="lista-pacientes">
            ${pacientes.length === 0 ? '<p>Nenhum paciente cadastrado.</p>' : ''}
        </ul>
    `;
    updatePacientesList(); // Renderiza a lista inicial de pacientes

    document.getElementById('paciente-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const nome = document.getElementById('paciente-nome').value;
        const idade = document.getElementById('paciente-idade').value;
        const cpf = document.getElementById('paciente-cpf').value;

        // Validação básica do CPF
        if (cpf.length !== 11 || isNaN(cpf)) {
            alert('⚠️ Por favor, insira um CPF válido com 11 dígitos numéricos.');
            return;
        }

        pacientes.push({ nome, idade: parseInt(idade), cpf }); // Converte idade para número
        alert('✅ Paciente cadastrado com sucesso!');
        document.getElementById('paciente-form').reset(); // Limpa o formulário
        updatePacientesList(); // Atualiza a lista exibida
        // Não é necessário chamar renderDashboardPage aqui, o DOMContentLoaded cuidará da primeira carga
    });
}

function updatePacientesList() {
    const listaPacientes = document.getElementById('lista-pacientes');
    if (!listaPacientes) return;

    if (pacientes.length === 0) {
        listaPacientes.innerHTML = '<p>Nenhum paciente cadastrado.</p>';
    } else {
        listaPacientes.innerHTML = pacientes.map((p, index) => `
            <li>
                <strong>Paciente ${index + 1}:</strong> ${p.nome}<br>
                Idade: ${p.idade} | CPF: ${p.cpf}
            </li>
        `).join('');
    }
    // Após atualizar a lista, se o dashboard estiver visível, atualize os contadores
    // if (document.querySelector('.app-main-content h2').textContent.includes('Dashboard')) {
    //     renderDashboardPage(); // Isso pode causar loop se não for bem controlado
    // }
}


function renderMedicosPage() {
    const mainContent = document.querySelector('.app-main-content');
    mainContent.innerHTML = `
        <div class="breadcrumbs">
            <i class="fas fa-home"></i> Dashboard &gt; <i class="fas fa-user-md"></i> Médicos
        </div>
        <h2><i class="fas fa-user-md"></i> Gerenciar Médicos</h2>
        <div class="form-container">
            <h3>Cadastrar Novo Médico</h3>
            <form id="medico-form">
                <label for="medico-nome">Nome Completo:</label>
                <input type="text" id="medico-nome" required><br>
                <label for="medico-especialidade">Especialidade:</label>
                <input type="text" id="medico-especialidade" required><br>
                <label for="medico-crm">CRM:</label>
                <input type="text" id="medico-crm" required><br>
                <button type="submit"><i class="fas fa-plus-square"></i> Cadastrar Médico</button>
            </form>
        </div>
        <h3>Lista de Médicos Cadastrados</h3>
        <ul class="list-container" id="lista-medicos">
            ${medicos.length === 0 ? '<p>Nenhum médico cadastrado.</p>' : ''}
        </ul>
    `;
    updateMedicosList();

    document.getElementById('medico-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const nome = document.getElementById('medico-nome').value;
        const especialidade = document.getElementById('medico-especialidade').value;
        const crm = document.getElementById('medico-crm').value;
        medicos.push({ nome, especialidade, crm });
        alert('✅ Médico cadastrado com sucesso!');
        document.getElementById('medico-form').reset();
        updateMedicosList();
        // Não é necessário chamar renderDashboardPage aqui
    });
}

function updateMedicosList() {
    const listaMedicos = document.getElementById('lista-medicos');
    if (!listaMedicos) return;

    if (medicos.length === 0) {
        listaMedicos.innerHTML = '<p>Nenhum médico cadastrado.</p>';
    } else {
        listaMedicos.innerHTML = medicos.map((m, index) => `
            <li>
                <strong>Médico ${index + 1}:</strong> ${m.nome}<br>
                Especialidade: ${m.especialidade} | CRM: ${m.crm}
            </li>
        `).join('');
    }
}

function renderConsultasPage() {
    const mainContent = document.querySelector('.app-main-content');
    mainContent.innerHTML = `
        <div class="breadcrumbs">
            <i class="fas fa-home"></i> Dashboard &gt; <i class="fas fa-calendar-alt"></i> Consultas
        </div>
        <h2><i class="fas fa-calendar-alt"></i> Agendar e Ver Consultas</h2>
        <div class="form-container">
            <h3>Agendar Nova Consulta</h3>
            <form id="consulta-form">
                <label for="select-paciente">Paciente:</label>
                <select id="select-paciente" required>
                    <option value="">Selecione um paciente</option>
                    ${pacientes.map((p, index) => `<option value="${index}">${p.nome}</option>`).join('')}
                </select><br>

                <label for="select-medico">Médico:</label>
                <select id="select-medico" required>
                    <option value="">Selecione um médico</option>
                    ${medicos.map((m, index) => `<option value="${index}">${m.nome} (${m.especialidade})</option>`).join('')}
                </select><br>

                <label for="consulta-data">Data:</label>
                <input type="date" id="consulta-data" required><br>

                <label for="consulta-hora">Hora:</label>
                <input type="time" id="consulta-hora" required><br>

                <button type="submit" id="agendar-consulta-btn"><i class="fas fa-calendar-check"></i> Agendar Consulta</button>
            </form>
            <p id="consulta-warning" class="warning" style="display:none;">⚠️ É preciso ter pelo menos um paciente e um médico cadastrados para agendar consultas.</p>
        </div>
        <h3>Consultas Marcadas</h3>
        <ul class="list-container" id="lista-consultas">
            ${consultas.length === 0 ? '<p>Nenhuma consulta marcada.</p>' : ''}
        </ul>
    `;
    updateConsultasList();

    const agendarBtn = document.getElementById('agendar-consulta-btn');
    const consultaWarning = document.getElementById('consulta-warning');

    if (pacientes.length === 0 || medicos.length === 0) {
        agendarBtn.disabled = true;
        consultaWarning.style.display = 'block';
    } else {
        agendarBtn.disabled = false;
        consultaWarning.style.display = 'none';
    }

    document.getElementById('consulta-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const pacienteIndex = document.getElementById('select-paciente').value;
        const medicoIndex = document.getElementById('select-medico').value;
        const data = document.getElementById('consulta-data').value;
        const hora = document.getElementById('consulta-hora').value;

        if (pacienteIndex === "" || medicoIndex === "") {
            alert('⚠️ Por favor, selecione um paciente e um médico.');
            return;
        }

        const paciente = pacientes[parseInt(pacienteIndex)];
        const medico = medicos[parseInt(medicoIndex)];

        consultas.push({ paciente, medico, data, hora });
        alert('✅ Consulta agendada com sucesso!');
        document.getElementById('consulta-form').reset();
        updateConsultasList();
        // Não é necessário chamar renderDashboardPage aqui
    });
}

function updateConsultasList() {
    const listaConsultas = document.getElementById('lista-consultas');
    if (!listaConsultas) return;

    if (consultas.length === 0) {
        listaConsultas.innerHTML = '<p>Nenhuma consulta marcada.</p>';
    } else {
        listaConsultas.innerHTML = consultas.map(c => `
            <li>
                🗓️ <strong>Paciente:</strong> ${c.paciente.nome}<br>
                👨‍⚕️ <strong>Médico:</strong> ${c.medico.nome} (${c.medico.especialidade})<br>
                ⏰ <strong>Data e Hora:</strong> ${c.data} às ${c.hora}
            </li>
        `).join('');
    }
}


function renderEmergenciaPage() {
    const mainContent = document.querySelector('.app-main-content');
    const phonesHtml = usefulPhones.map(phone => `<li>${phone}</li>`).join('');

    mainContent.innerHTML = `
        <div class="breadcrumbs">
            <i class="fas fa-home"></i> Dashboard &gt; <i class="fas fa-ambulance"></i> Emergência
        </div>
        <h2><i class="fas fa-ambulance"></i> Telefones Úteis de Saúde e Emergência</h2>
        <p>Em caso de emergência ou para informações de saúde, utilize os números abaixo:</p>
        <ul class="list-section">
            ${phonesHtml}
        </ul>
    `;
}

function renderMapaSJMPage() {
    const mainContent = document.querySelector('.app-main-content');

    // Filtra os números de emergência para o InfoCard
    const emergencyNumbersForCard = usefulPhones.filter(phone =>
        phone.includes("SAMU") || phone.includes("Bombeiros") || phone.includes("Polícia")
    ).map(phone => {
        const parts = phone.split(':');
        // Usar o segundo elemento como 'info' se não houver 'endereço'
        return { nome: parts[0].trim(), endereco: parts[1] ? parts[1].trim() : '' };
    });

    mainContent.innerHTML = `
        <div class="breadcrumbs">
            <i class="fas fa-home"></i> Dashboard &gt; <i class="fas fa-map-marked-alt"></i> Mapa SJM
        </div>
        <h2><i class="fas fa-map-marked-alt"></i> Mapa Interativo de Saúde - São João de Meriti</h2>
        <div class="map-container-grid">
            ${createInfoCard("Hospitais e Postos de Saúde", sjmInfo.hospitaisEPostos)}
            ${createInfoCard("Farmácias em Destaque", sjmInfo.farmacias)}
            ${createInfoCard("Números de Emergência", emergencyNumbersForCard)}
        </div>
        <div class="map-placeholder">
            ${createLocationButton()}
        </div>

        <div class="section-dicas-vacinacao">
            <h3><i class="fas fa-syringe"></i> Postos de Vacinação em SJM</h3>
            <p>Confira os principais locais para vacinação e seus horários de funcionamento:</p>
            <ul class="list-section">
                ${sjmInfo.postosVacinacao.map(posto => `
                    <li>
                        <strong>${posto.nome}</strong><br>
                        Horário: ${posto.funcionamento}
                    </li>
                `).join('')}
            </ul>
        </div>

        <div class="section-dicas-vacinacao">
            <h3><i class="fas fa-heartbeat"></i> Dicas Essenciais para sua Saúde</h3>
            <p>Pequenas atitudes diárias que fazem uma grande diferença:</p>
            <ul class="list-section">
                ${sjmInfo.dicasSaude.map(dica => `<li>${dica}</li>`).join('')}
            </ul>
        </div>
    `;
    attachInternalLinkListeners(); // Anexa listeners após renderizar
}

// **A PÁGINA DE SINTOMAS IA COM A NOVA ESTRUTURA PARA CONECTAR AO BACKEND**
function renderSintomasIAPage() {
    const mainContent = document.querySelector('.app-main-content');
    mainContent.innerHTML = `
        <div class="breadcrumbs">
            <i class="fas fa-home"></i> Dashboard &gt; <i class="fas fa-brain"></i> Sintomas IA
        </div>
        <h2><i class="fas fa-brain"></i> Análise de Sintomas com IA </h2>
        <p>Descreva seus sintomas abaixo para receber uma orientação preliminar. Lembre-se, esta ferramenta é apenas para informação e não substitui a consulta médica presencial!</p>

        <div class="form-container">
            <h3>Descreva seus Sintomas</h3>
            <form id="sintomas-ia-form">
                <label for="sintomas-input">Seus Sintomas (ex: dor de cabeça, febre, tosse seca):</label>
                <textarea id="sintomas-input" rows="5" placeholder="Descreva o que você está sentindo..." required></textarea><br>
                <button type="submit"><i class="fas fa-robot"></i> Analisar Sintomas</button>
            </form>
        </div>

        <div id="ia-resultado" class="list-container" style="display: none; margin-top: 20px;">
            <h3>Resultados da Análise</h3>
            <div id="ia-resultado-content" style="padding: 15px; background-color: #e6f2ff; border-radius: var(--border-radius); border: 1px solid #b3d9ff;">
                </div>
        </div>

        <div class="warning" style="margin-top: 20px;">
            <p><i class="fas fa-exclamation-triangle"></i> **Atenção:** Esta orientação é gerada por Inteligência Artificial e é apenas informativa. Para um diagnóstico preciso e tratamento adequado, procure sempre um profissional de saúde. Em casos de emergência, ligue para 192 (SAMU) ou 193 (Bombeiros).</p>
        </div>
    `;

    // Adiciona o event listener para o formulário
    document.getElementById('sintomas-ia-form').addEventListener('submit', handleSintomasIASubmit);
}

// **NOVA FUNÇÃO: FAZ A REQUISIÇÃO PARA O BACKEND PYTHON**
async function sendSymptomsToAI(symptoms) {
    try {
        // A URL deve apontar para o seu servidor Python.
        // CORRIGIDO: A rota no backend Python que forneci era '/analisar_sintomas'
        const response = await fetch('http://localhost:5000/analisar_sintomas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sintomas: symptoms }) // Envia os sintomas como JSON
        });

        if (!response.ok) { // Verifica se a resposta HTTP foi bem-sucedida (status 2xx)
            const errorText = await response.text(); // Tenta ler o texto do erro
            throw new Error(`Erro HTTP! Status: ${response.status} - ${errorText}`);
        }

        const data = await response.json(); // Pega a resposta JSON do backend
        return data.analise_ia; // Retorna a análise da IA (nome da chave no backend)
    } catch (error) {
        console.error('Erro ao chamar a IA (backend):', error);
        // Retorna uma mensagem de erro estilizada se houver problema na conexão
        const rootStyles = getComputedStyle(document.documentElement);
        const dangerColor = rootStyles.getPropertyValue('--danger-color').trim() || '#dc3545'; // Cor padrão de fallback
        return `<p style="color: ${dangerColor};"><i class="fas fa-exclamation-circle"></i> Ocorreu um erro ao conectar com o serviço de análise de sintomas. Por favor, verifique se o servidor Python está rodando e tente novamente.</p>`;
    }
}

// **NOVA IMPLEMENTAÇÃO DO HANDLER DE ENVIO DO FORMULÁRIO DE SINTOMAS**
async function handleSintomasIASubmit(event) {
    event.preventDefault(); // Evita o recarregamento da página

    const sintomasInput = document.getElementById('sintomas-input');
    const sintomas = sintomasInput.value.trim(); // Use trim() para remover espaços em branco no início/fim

    const resultadoDiv = document.getElementById('ia-resultado');
    const resultadoContentDiv = document.getElementById('ia-resultado-content');

    if (!sintomas) {
        resultadoContentDiv.innerHTML = "<p>Por favor, digite seus sintomas antes de analisar.</p>";
        resultadoDiv.style.display = 'block';
        return;
    }

    // Mostra um estado de carregamento enquanto a IA processa
    resultadoContentDiv.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> Analisando seus sintomas... Por favor, aguarde.</p>';
    resultadoDiv.style.display = 'block';

    // Chama a função assíncrona para enviar os sintomas para o backend
    const recomendacaoDaIA = await sendSymptomsToAI(sintomas);

    // Exibe a recomendação recebida do backend
    resultadoContentDiv.innerHTML = recomendacaoDaIA;
    sintomasInput.value = ''; // Limpa o campo de texto
}

function renderTelemedicinaPage() {
    const mainContent = document.querySelector('.app-main-content');
    mainContent.innerHTML = `
        <div class="breadcrumbs">
            <i class="fas fa-home"></i> Dashboard &gt; <i class="fas fa-hand-holding-medical"></i> Telemedicina
        </div>
        <h2><i class="fas fa-hand-holding-medical"></i> Consultas e Suporte Online via Telemedicina</h2>
        <p>Com a telemedicina, você pode agendar e realizar consultas médicas de forma remota, no conforto da sua casa.</p>
        <p>Nossos serviços de telemedicina incluirão:</p>
        <ul class="list-section">
            <li>Agendamento de consultas por vídeo.</li>
            <li>Prontuário eletrônico integrado.</li>
            <li>Receitas e atestados digitais (quando aplicável).</li>
            <li>Suporte e acompanhamento médico remoto.</li>
        </ul>
        <p>Funcionalidade em desenvolvimento. Fique atento às novidades!</p>
    `;
}

// NOVA FUNÇÃO: renderAjudaPage
function renderAjudaPage() {
    const mainContent = document.querySelector('.app-main-content');
    mainContent.innerHTML = `
        <div class="breadcrumbs">
            <i class="fas fa-home"></i> Dashboard &gt; <i class="fas fa-question-circle"></i> Ajuda
        </div>
        <h2><i class="fas fa-question-circle"></i> Precisa de Ajuda?</h2>
        <p>Olá! Se você tem alguma dúvida, sugestão ou encontrou algum problema ao usar o SJM Saúde Digital, sinta-se à vontade para entrar em contato. Sua opinião é muito importante para nós!</p>

        <div class="info-card">
            <h3>Canais de Contato</h3>
            <ul>
                <li><strong>E-mail:</strong> <a href="mailto:lohranpaula@gmail.com">lohranpaula@gmail.com</a></li>
                <li><strong>Instagram:</strong> <a href="https://www.instagram.com/lohran_39/" target="_blank">@lohran_39</a></li>
            </ul>
        </div>

        <div class="section-dicas-vacinacao">
            <h3>Como podemos te ajudar?</h3>
            <ul class="list-section">
                <li><strong>Navegação:</strong> Utilize o menu lateral para acessar as diferentes seções do sistema (Dashboard, Pacientes, Médicos, Consultas, etc.).</li>
                <li><strong>Cadastro de Dados:</strong> Nas seções de Pacientes, Médicos e Consultas, você pode cadastrar e visualizar informações. Certifique-se de preencher todos os campos obrigatórios.</li>
                <li><strong>Análise de Sintomas (IA):</strong> Na seção "Sintomas IA", você pode descrever o que está sentindo e receber uma orientação preliminar. Lembre-se que é uma ferramenta informativa e não substitui a consulta médica.</li>
                <li><strong>Mapa SJM:</strong> Explore informações sobre farmácias, hospitais, postos de saúde e vacinação em São João de Meriti.</li>
                <li><strong>Telefones Úteis:</strong> A página de "Emergência" lista números importantes para situações de saúde e segurança.</li>
            </ul>
        </div>

        <div class="warning" style="margin-top: 20px;">
            <p><i class="fas fa-info-circle"></i> **Dica:** Para um melhor desempenho e visualização do site, recomendamos usar um navegador atualizado como Google Chrome, Mozilla Firefox, Microsoft Edge ou Safari.</p>
        </div>
    `;
}


// --- Lógica de Roteamento e Navegação ---

// Mapeia os data-page para as funções de renderização
const pageRenderFunctions = {
    'dashboard': renderDashboardPage,
    'pacientes': renderPacientesPage,
    'medicos': renderMedicosPage,
    'consultas': renderConsultasPage,
    'emergencia': renderEmergenciaPage,
    'mapa-sjm': renderMapaSJMPage,
    'sintomas-ia': renderSintomasIAPage,
    'telemedicina': renderTelemedicinaPage,
    'ajuda': renderAjudaPage // ADICIONADO: Mapeia 'ajuda' para a nova função
};

// Função para carregar a página com base na opção clicada
function loadPage(pageName) {
    // Remove a classe 'active' de todos os links de navegação da sidebar
    document.querySelectorAll('.main-nav .nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Adiciona a classe 'active' ao link da sidebar clicado
    const activeLink = document.querySelector(`.main-nav .nav-link[data-page="${pageName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Fecha a sidebar em mobile se estiver aberta
    const sidebar = document.querySelector('.sidebar');
    const menuToggleGlobal = document.querySelector('.menu-toggle-global');

    if (sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        if (menuToggleGlobal) {
            menuToggleGlobal.innerHTML = '<i class="fas fa-bars"></i>'; // Volta para ícone de barras
        }
    }

    // Chama a função de renderização da página correspondente
    const renderFunction = pageRenderFunctions[pageName];
    if (renderFunction) {
        renderFunction();
    } else {
        document.querySelector('.app-main-content').innerHTML = `
            <div class="breadcrumbs">
                <i class="fas fa-exclamation-triangle"></i> Página não encontrada
            </div>
            <h2>Erro 404</h2>
            <p>A página "${pageName}" não foi encontrada. Por favor, verifique o endereço ou use o menu de navegação.</p>
            <p><a href="#" data-page="dashboard" class="internal-link">Voltar para Dashboard</a></p>
        `;
    }
    // Anexa listeners aos links internos (inclusive o "Voltar para Dashboard")
    attachInternalLinkListeners();
}

// Nova função para anexar event listeners a links gerados dinamicamente
function attachInternalLinkListeners() {
    document.querySelectorAll('.app-main-content .internal-link').forEach(link => {
        link.removeEventListener('click', handleInternalLinkClick); // Remove para evitar duplicidade
        link.addEventListener('click', handleInternalLinkClick);
    });
}

function handleInternalLinkClick(event) {
    event.preventDefault();
    const pageName = event.target.closest('.internal-link').dataset.page;
    if (pageName) {
        loadPage(pageName);
    }
}


// Adiciona event listeners para os links de navegação e o menu toggle global
document.addEventListener('DOMContentLoaded', () => {
    // Evento para os links de navegação da sidebar
    document.querySelectorAll('.main-nav .nav-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const pageName = event.target.closest('.nav-link').dataset.page;
            loadPage(pageName);
        });
    });

    // Evento para o botão de menu hambúrguer global
    const menuToggleGlobal = document.querySelector('.menu-toggle-global');
    const sidebar = document.querySelector('.sidebar');

    if (menuToggleGlobal && sidebar) {
        menuToggleGlobal.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            if (sidebar.classList.contains('active')) {
                menuToggleGlobal.innerHTML = '<i class="fas fa-times"></i>'; // Ícone "X"
            } else {
                menuToggleGlobal.innerHTML = '<i class="fas fa-bars"></i>'; // Ícone de barras
            }
        });
    }

    // Carrega a página inicial ao carregar a aplicação
    loadPage('mapa-sjm'); // Mantemos Mapa SJM como página inicial

    // Chamamos o attachInternalLinkListeners uma vez para os links iniciais (se houver)
    // E será chamado novamente cada vez que uma página for renderizada
    attachInternalLinkListeners();
});
// ===== CONFIGURAÇÕES =====
const SENHA_CORRETA = '09112025'; // ALTERE AQUI (DDMMAAAA)

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar AOS
    AOS.init({
        duration: 1200,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });

    // Inicializar Particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#9f4b4b' },
                shape: { type: 'circle' },
                opacity: { value: 0.3, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: false },
                move: { enable: true, speed: 1, direction: 'none', random: true }
            }
        });
    }

    // Inicializar Lightbox
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 300,
            'wrapAround': true,
            'albumLabel': 'Foto %1 de %2'
        });
    }

    // Eventos da tela de senha
    const inputs = document.querySelectorAll('.senha-input');
    inputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            // Auto-pular para o próximo campo quando preenchido
            if (this.value.length === this.maxLength) {
                const next = inputs[index + 1];
                if (next) next.focus();
            }
            
            // Verificar automaticamente quando todos estiverem preenchidos
            const dia = document.getElementById('dia').value.padStart(2, '0');
            const mes = document.getElementById('mes').value.padStart(2, '0');
            const ano = document.getElementById('ano').value;
            if (dia.length === 2 && mes.length === 2 && ano.length === 4) {
                verificarSenha(true); // true indica chamada automática
            }
        });

        input.addEventListener('keydown', function(e) {
            // Se for backspace e o campo estiver vazio, volta para o anterior
            if (e.key === 'Backspace' && this.value.length === 0) {
                const prev = inputs[index - 1];
                if (prev) {
                    prev.focus();
                }
            }
        });
    });

    // Botão de entrar manualmente
    document.getElementById('senhaBotao').addEventListener('click', () => verificarSenha(false));

    // Header scroll
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Menu mobile
    document.querySelector('.nav-toggle').addEventListener('click', () => {
        document.querySelector('.nav-menu').classList.toggle('active');
    });

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
            document.querySelector('.nav-menu').classList.remove('active');
        });
    });

    // Ativar link do menu conforme scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Iniciar contador de tempo (mas só depois que o site for exibido)
    // Vamos iniciar quando o site for mostrado, para não consumir recursos
});

// ===== FUNÇÃO DE VERIFICAÇÃO DE SENHA =====
function verificarSenha(automatico = false) {
    const dia = document.getElementById('dia').value.padStart(2, '0');
    const mes = document.getElementById('mes').value.padStart(2, '0');
    const ano = document.getElementById('ano').value;
    const dataDigitada = dia + mes + ano;

    if (dataDigitada === SENHA_CORRETA) {
        // Esconder tela de senha
        document.getElementById('senhaOverlay').classList.add('hidden');
        
        // Mostrar tela de carregamento
        document.getElementById('loadingOverlay').classList.remove('hidden');
        
        // Simular carregamento com animação
        simularCarregamento();
    } else {
        // Mostrar erro
        const erro = document.getElementById('senhaErro');
        erro.classList.add('show');
        
        // Pequena animação nos campos
        document.querySelectorAll('.senha-input').forEach(input => {
            input.style.animation = 'shake 0.4s ease';
            setTimeout(() => {
                input.style.animation = '';
            }, 400);
        });
        
        setTimeout(() => {
            erro.classList.remove('show');
        }, 3000);
    }
}

// ===== SIMULAR CARREGAMENTO =====
function simularCarregamento() {
    const progress = document.getElementById('loadingProgress');
    const loadingOverlay = document.getElementById('loadingOverlay');
    let width = 0;
    
    const interval = setInterval(() => {
        width += Math.random() * 10 + 5;
        if (width >= 100) {
            width = 100;
            progress.style.width = width + '%';
            clearInterval(interval);
            
            // Após completar, esconder loading e mostrar site
            setTimeout(() => {
                loadingOverlay.classList.add('hidden');
                document.getElementById('siteContent').style.display = 'block';
                
                // Iniciar contador de tempo
                iniciarContador();
                
                // Animar entrada do conteúdo
                gsap.from('.site-content', {
                    opacity: 0,
                    duration: 1.5,
                    ease: 'power2.out'
                });
            }, 500);
        }
        progress.style.width = width + '%';
    }, 80);
}

// ===== CONTADOR DE TEMPO =====
function iniciarContador() {
    // DATA DE INÍCIO DO NAMORO (ajuste aqui)
    const dataInicio = new Date('2025-10-28T17:38:00');
    
    function atualizar() {
        const agora = new Date();
        const diff = agora - dataInicio;
        
        const segundos = Math.floor(diff / 1000) % 60;
        const minutos = Math.floor(diff / (1000 * 60)) % 60;
        const horas = Math.floor(diff / (1000 * 60 * 60)) % 24;
        const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        document.getElementById('dias').textContent = dias;
        document.getElementById('horas').textContent = horas.toString().padStart(2, '0');
        document.getElementById('minutos').textContent = minutos.toString().padStart(2, '0');
        document.getElementById('segundos').textContent = segundos.toString().padStart(2, '0');
    }
    
    atualizar();
    setInterval(atualizar, 1000);
}

// ===== DESAFIOS =====
function verificarDesafio(botao, resultado) {
    const card = botao.closest('.challenge-card');
    const feedback = card.querySelector('.challenge-feedback');
    const opcoes = card.querySelectorAll('.challenge-option');
    
    opcoes.forEach(opt => opt.disabled = true);
    
    if (resultado === 'certo') {
        botao.classList.add('correct');
        feedback.innerHTML = '❤️ Acertou! ❤️';
        feedback.style.color = '#4caf50';
        
        // Animação extra
        gsap.to(card, {
            scale: 1.05,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            ease: 'power1.inOut'
        });
    } else {
        botao.classList.add('wrong');
        feedback.innerHTML = '😢 Tente novamente em outra pergunta.';
        feedback.style.color = '#f44336';
        
        opcoes.forEach(opt => {
            if (opt.getAttribute('onclick') && opt.getAttribute('onclick').includes('certo')) {
                opt.classList.add('correct');
            }
        });
    }
}

function verificarFrase(botao) {
    const card = botao.closest('.challenge-card');
    const input = card.querySelector('.challenge-input');
    const feedback = card.querySelector('.challenge-feedback');
    const resposta = input.value.trim().toLowerCase();
    
    if (resposta.includes('chocolate') || resposta.includes('amor') || resposta.length > 5) {
        feedback.innerHTML = '💖 Resposta adorável, Agora vá no whats e me encha de elogios carinhosos e fofinhooosss hihiii! 💖';
        feedback.style.color = '#4caf50';
        
        gsap.to(card, {
            rotationY: 360,
            duration: 0.8,
            ease: 'power2.out'
        });
    } else {
        feedback.innerHTML = 'Hmm, tente escrever algo mais carinhoso... Você é melhor do que isso!';
        feedback.style.color = '#f44336';
    }
}

// ===== SURPRESA =====
function iniciarSurpresa() {
    alert('🎉 Surpresa! Em breve você terá um presente especial. Fique atenta!');
}

// ===== MÚSICA =====
let musicaTocando = false;
const musica = document.getElementById('background-music');
const musicBtn = document.querySelector('.music-toggle');
const musicIcon = musicBtn.querySelector('i');

function toggleMusic() {
    if (musicaTocando) {
        musica.pause();
        musicIcon.className = 'fas fa-play';
    } else {
        musica.play().catch(e => console.log('Usuário precisa interagir primeiro'));
        musicIcon.className = 'fas fa-pause';
    }
    musicaTocando = !musicaTocando;
}
// ===== SURPRESA MODAL =====
function iniciarSurpresa() {
    const modal = document.getElementById('surpresaModal');
    
    // Define a mensagem (pode ser personalizada)
    const mensagem = document.getElementById('surpresaMensagem');
    mensagem.innerHTML = `
        <p>✨ Convite! ✨</p>
        <p style="font-size: 1.2rem; margin-top: 1rem;">Um convite antecipado pro meu casamento...</p>
        <p style="font-size: 0.9rem; opacity: 0.8;">PS: Vá de Branco!🤍 Você é a convidada VIP!</p>
    `;
    
    modal.classList.add('show');
    
    // Abrir animação do embrulho após um pequeno delay
    setTimeout(() => {
        const embrulho = document.querySelector('.surpresa-embrulho');
        embrulho.classList.add('aberto');
        
        // Criar confetes (opcional)
        criarConfetes();
    }, 300);
}

function fecharSurpresa() {
    const modal = document.getElementById('surpresaModal');
    const embrulho = document.querySelector('.surpresa-embrulho');
    
    embrulho.classList.remove('aberto');
    modal.classList.remove('show');
    
    // Remover confetes
    document.querySelectorAll('.confete').forEach(c => c.remove());
}

// Função para criar confetes (opcional)
function criarConfetes() {
    for (let i = 0; i < 50; i++) {
        const confete = document.createElement('div');
        confete.className = 'confete';
        confete.style.left = Math.random() * 100 + '%';
        confete.style.animationDelay = Math.random() * 2 + 's';
        confete.style.background = `hsl(${Math.random() * 360}, 80%, 60%)`;
        confete.style.width = Math.random() * 15 + 5 + 'px';
        confete.style.height = confete.style.width;
        document.body.appendChild(confete);
        
        // Remover após a animação
        setTimeout(() => {
            confete.remove();
        }, 5000);
    }
}
// ===== RECORDAÇÕES =====
// Lista de mensagens (adicione quantas quiser)
const mensagens = [
    { data: "15/01/2023", texto: "Oii bibyzinha🤍... Aqui estou eu 2:10 da madrugada, fazendo esse texto porque não consegui dormir..." },
    { data: "20/03/2023", texto: "primeiramente, eu vou começar me desculpando por esses dias eu não ter tido contato com vc como eu deveria..." },
    { data: "10/06/2023", texto: "Vida... Eu sei que vc disse que queria se 'desapegar' dos boa noite, disse pra mim que não se importava mais e que tava tudo bem... " },
    { data: "25/12/2023", texto: "É amorzinho, sei que não apareço por aqui a um bom tempo, sei que vc deve sentir falta dos textinhos..." },
    { data: "14/02/2024", texto: "Eu caçaria um milhão de vaga-lumes por você, mas do que adiantaria, se o unico brilho que eu preciso caçar é o do seu olhar?" },
    { data: "20/03/2024", texto: "Leonardo da Vinci precisou de quatro anos para pintar a Mona Lisa, mas ele arriscaria passar uma eternidade para TENTAR retratar os traços do seu sorriso." },
    { data: "01/05/2024", texto: "Você é a razão dos meus sorrisos e a calmaria das minhas tempestades." },
    { data: "15/06/2024", texto: "Lembra da nossa primeira discussão? No fim, rimos e percebemos que nada é maior que nosso amor." },
    { data: "07/09/2024", texto: "Independência? A única independência que não quero é a de você." }
];

let mensagensVisiveis = 6; // Quantas aparecem inicialmente
const memoriesGrid = document.getElementById('memoriesGrid');
const loadMoreContainer = document.getElementById('loadMoreContainer');

function renderizarMemorias(limite) {
    // Limpa o grid
    memoriesGrid.innerHTML = '';
    
    // Pega as primeiras N mensagens
    const mensagensParaMostrar = mensagens.slice(0, limite);
    
    mensagensParaMostrar.forEach(msg => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.innerHTML = `
            <span class="memory-date">${msg.data}</span>
            <p class="memory-text">${msg.texto}</p>
            <div class="memory-footer">❤️</div>
        `;
        memoriesGrid.appendChild(card);
    });
    
    // Esconde o botão "Carregar mais" se já mostrou todas
    if (limite >= mensagens.length) {
        loadMoreContainer.style.display = 'none';
    } else {
        loadMoreContainer.style.display = 'block';
    }
}

function carregarMaisMemorias() {
    mensagensVisiveis += 3; // Carrega mais 3 a cada clique
    if (mensagensVisiveis > mensagens.length) {
        mensagensVisiveis = mensagens.length;
    }
    renderizarMemorias(mensagensVisiveis);
}

// No início, após o site ser exibido, chamar a renderização
// Dentro da função que abre o site (após o loading), adicione:
// renderizarMemorias(mensagensVisiveis);

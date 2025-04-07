// Menu mobile (simplificado)
document.addEventListener('DOMContentLoaded', function() {
    // Validação do formulário
    const formulario = document.getElementById('form-contato');
    const mensagemForm = document.querySelector('.mensagem-form');
    
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação simples
            const nome = formulario.nome.value.trim();
            const email = formulario.email.value.trim();
            const mensagem = formulario.mensagem.value.trim();
            
            if (nome === '' || email === '' || mensagem === '') {
                mostrarMensagem('Por favor, preencha todos os campos.', 'erro');
                return;
            }
            
            if (!validarEmail(email)) {
                mostrarMensagem('Por favor, insira um email válido.', 'erro');
                return;
            }
            
            // Simular envio
            mostrarMensagem('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'sucesso');
            formulario.reset();
            
            // Aqui você pode adicionar AJAX para enviar para o backend
            // enviarParaBackend({ nome, email, mensagem });
        });
    }
    
    // Função para validar email
    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Função para mostrar mensagens
    function mostrarMensagem(texto, tipo) {
        mensagemForm.textContent = texto;
        mensagemForm.className = 'mensagem-form ' + tipo;
        
        // Esconder mensagem após 5 segundos
        setTimeout(() => {
            mensagemForm.style.display = 'none';
        }, 5000);
    }
    
    // Scroll suave para links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Função para enviar dados para o backend (exemplo)
async function enviarParaBackend(dados) {
    try {
        const resposta = await fetch('/api/contato', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados)
        });
        
        const resultado = await resposta.json();
        console.log('Sucesso:', resultado);
    } catch (erro) {
        console.error('Erro:', erro);
    }
}
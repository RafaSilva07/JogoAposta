const quadrados = document.querySelectorAll('.quadrado');
const btnIniciar = document.getElementById('iniciar');
const btnReiniciar = document.getElementById('reiniciar');
const selecaoQuadrado = document.getElementById('selecao-quadrado');
const resultado = document.getElementById('resultado');
let corridaAtiva = false;

btnIniciar.addEventListener('click', () => {
    if (corridaAtiva) return; // Evita iniciar outra corrida enquanto uma já está em andamento
    corridaAtiva = true;
    resultado.textContent = ''; // Limpa o resultado anterior

    const aposta = selecaoQuadrado.value; // Obtém a aposta do usuário

    const interval = setInterval(() => {
        let vencedor = null;

        quadrados.forEach((quadrado) => {
            // Movimento aleatório
            const movimento = Math.random() * 5;
            const posicaoAtual = parseFloat(quadrado.style.left || 0);
            quadrado.style.left = `${posicaoAtual + movimento}px`;

            // Verifica se algum quadrado venceu
            if (posicaoAtual + movimento >= 550) { // Pista termina com 550px
                vencedor = quadrado.textContent;
            }
        });

        if (vencedor) {
            clearInterval(interval);
            corridaAtiva = false;

            // Verifica se o usuário ganhou ou perdeu
            if (vencedor === aposta) {
                resultado.textContent = `O quadrado ${vencedor} venceu! Você ganhou a aposta! 🎉`;
                resultado.style.color = 'green';
            } else {
                resultado.textContent = `O quadrado ${vencedor} venceu! Você perdeu a aposta. 😞`;
                resultado.style.color = 'red';
            }
        }
    }, 50); // Atualiza a posição a cada 50ms
});

btnReiniciar.addEventListener('click', () => {
    quadrados.forEach((quadrado) => {
        quadrado.style.left = '0px'; // Reseta a posição inicial
    });
    resultado.textContent = ''; // Limpa o resultado
    corridaAtiva = false; // Permite iniciar nova corrida
});

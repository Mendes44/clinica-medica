/* ================================================================
   FORMULÁRIOS DE AGENDAMENTO
   A camada de interface está pronta para chamar funções seguras no backend.
   Nunca coloque a chave service_role do Supabase neste arquivo.
   ================================================================ */

const tabs = [...document.querySelectorAll('[role="tab"]')];

// Alterna os painéis e move o foco corretamente para uso por teclado.
function selecionarAba(tab) {
    tabs.forEach((item) => {
        const active = item === tab;
        item.setAttribute('aria-selected', String(active));
        item.tabIndex = active ? 0 : -1;
        document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
    });
}
tabs.forEach((tab) => tab.addEventListener('click', () => selecionarAba(tab)));
tabs.forEach((tab, index) => tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const next = tabs[(index + direction + tabs.length) % tabs.length];
    selecionarAba(next);
    next.focus();
}));

// Define hoje como data mínima para evitar pedidos em datas passadas.
const dateInput = document.querySelector('#data-preferida');
if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

// Preenche a especialidade quando o visitante veio de um card específico.
const specialty = new URLSearchParams(window.location.search).get('especialidade');
const specialtySelect = document.querySelector('#especialidade');
if (specialtySelect && [...specialtySelect.options].some((option) => option.value === specialty)) specialtySelect.value = specialty;

// Máscara visual; o backend ainda deve normalizar e validar novamente.
function maskPhone(value) {
    return value.replace(/\D/g, '').slice(0, 11).replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2');
}
document.querySelectorAll('input[type="tel"]').forEach((input) => {
    input.addEventListener('input', () => { input.value = maskPhone(input.value); });
});

// Mostra retorno sem inserir HTML fornecido pelo usuário, prevenindo XSS no DOM.
function showMessage(form, text, type) {
    const box = form.querySelector('.mensagem-form');
    box.textContent = text;
    box.className = `mensagem-form ativa ${type}`;
}

// Validação amigável. O servidor continuará sendo a autoridade final.
function validate(form) {
    let valid = true;
    form.querySelectorAll('[required]').forEach((field) => {
        const fieldValid = field.checkValidity();
        field.setAttribute('aria-invalid', String(!fieldValid));
        if (!fieldValid && valid) field.focus();
        valid = valid && fieldValid;
    });
    return valid;
}

// Envia JSON somente se um endpoint seguro for configurado no atributo data-endpoint.
async function submitForm(form, demoMessage) {
    if (!validate(form)) return showMessage(form, 'Revise os campos obrigatórios destacados.', 'erro');
    if (form.querySelector('[name="website"]')?.value) return;
    const endpoint = form.dataset.endpoint;
    if (!endpoint) return showMessage(form, demoMessage, 'sucesso');

    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    try {
        const payload = Object.fromEntries(new FormData(form));
        const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!response.ok) throw new Error('Falha na solicitação');
        const result = await response.json();
        showMessage(form, result.message || 'Solicitação recebida com sucesso.', 'sucesso');
        form.reset();
    } catch {
        showMessage(form, 'Não foi possível concluir agora. Tente novamente ou fale conosco por telefone.', 'erro');
    } finally { button.disabled = false; }
}

document.querySelector('#form-agendamento')?.addEventListener('submit', (event) => {
    event.preventDefault();
    submitForm(event.currentTarget, 'Demonstração concluída: o formulário está validado e pronto para conectar ao Supabase. Nenhum dado foi enviado.');
});
document.querySelector('#form-consulta')?.addEventListener('submit', (event) => {
    event.preventDefault();
    submitForm(event.currentTarget, 'A consulta está pronta para receber o endpoint seguro do Supabase. Nesta demonstração, nenhum dado foi pesquisado.');
});

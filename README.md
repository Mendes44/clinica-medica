# Clínica Médica Life — frontend demonstrativo

Site estático multipágina, responsivo e preparado para demonstrar captação de leads e agendamentos para clientes.

## Páginas

- `index.html`: apresentação, diferenciais, especialidades e contato.
- `especialidades.html`: serviços, horários e chamadas para agendamento.
- `agendamento.html`: solicitação e consulta de protocolo.
- `privacidade.html`: modelo inicial de transparência e LGPD.

## Integração futura com Supabase

Os formulários possuem o atributo `data-endpoint`. Quando as Edge Functions estiverem publicadas, informe nele as URLs dos endpoints de criação e consulta. O arquivo `js/agendamento.js` já envia JSON quando um endpoint estiver configurado.

Nunca coloque a chave `service_role` no HTML ou JavaScript público. Valide novamente todos os campos no servidor, use Row Level Security, CAPTCHA/Turnstile, limite de requisições e respostas genéricas na consulta de protocolos.

## Antes de publicar

1. Troque domínio, telefone, endereço e textos demonstrativos.
2. Revise a Política de Privacidade com profissional qualificado.
3. Atualize `canonical`, `robots.txt`, `sitemap.xml` e os dados estruturados.
4. Otimize as imagens para WebP/AVIF e adicione uma imagem Open Graph.
5. Teste formulários, acessibilidade, responsividade e regras do backend.

# Plano de Interface Mobile — Vizinho Indica

## Direção de produto

O Vizinho Indica é um aplicativo de descoberta local em que moradores encontram e compartilham recomendações de prestadores. A experiência deve parecer nativa em iOS e Android, em retrato 9:16, com uma hierarquia calma e uma única ação principal por contexto: descobrir, recomendar ou chamar no WhatsApp.

A direção visual preserva a identidade aprovada: fundo lavanda muito claro (`#E7EDFD`), superfícies brancas, azul de ação (`#5981F3`), texto escuro (`#22262E`), CTA verde semântico para WhatsApp e tipografia Manrope. O traço distintivo é a composição de confiança local: cartões leves com contexto explícito de quem recomendou, sem visual de marketplace ou chat interno.

## Lista de telas

| Tela | Conteúdo e funcionalidade |
|---|---|
| Início | Saudação, localidade, busca, categorias, recomendações da vizinhança e CTA para nova indicação. |
| Explorar | Busca, filtros por categoria, lista virtualizada de prestadores e estado vazio. |
| Detalhe do prestador | Identidade, serviço, avaliação, distância, descrição, recomendações e CTA primária para WhatsApp. |
| Recomendar | Formulário em três etapas: serviço, categoria e relato opcional, com feedback de envio. |
| Perfil | Identidade do morador, métricas, atividade e atalhos de preferências. |
| Feedback de contato | Toast/sheet para informar abertura, indisponibilidade ou falha ao tentar contato externo. |

## Layout e comportamento

Cada tela usa safe areas e uma área de toque mínima de 44 pt no iOS e 48 dp no Android. A navegação principal usa quatro abas: Início, Explorar, Recomendar e Perfil. O detalhe é empilhado acima das abas, com retorno nativo previsível.

O conteúdo em lista usa `FlatList`; formulários usam rolagem vertical com teclado seguro. O botão de WhatsApp permanece dentro do cartão na descoberta e ganha largura total perto da identidade no detalhe. O texto adapta-se a Dynamic Type sem esconder ações relevantes.

## Fluxos prioritários

1. **Descoberta:** Início → categoria ou busca → card de prestador → detalhe → “Chame no WhatsApp”.
2. **Contato externo:** CTA → validação do número → tentativa de abertura do WhatsApp → feedback de sucesso/falha → retorno preserva a origem.
3. **Recomendação:** Aba Recomendar → serviço → categoria → relato opcional → publicar → confirmação local.
4. **Exploração:** Aba Explorar → busca ou categoria → lista filtrada ou estado vazio → limpar busca.

## Tokens iniciais

| Grupo | Tokens |
|---|---|
| Cores | `bgApp #E7EDFD`, `surface #FFFFFF`, `primary #5981F3`, `text #22262E`, `muted #667085`, `whatsapp #1FB866`, `success #1B9B68`. |
| Espaçamento | Escala de 4, 8, 12, 16, 20, 24, 32 e 48. |
| Raios | Controle 14, cartão 24, cápsula 999. |
| Tipografia | Manrope 400/500/600/700/800, com títulos compactos e corpo mínimo de 14 pt. |
| Movimento | Press feedback de escala entre 0,97 e 0,98; transições discretas de 150–250 ms; redução de movimento respeitada. |

## Fora do escopo nesta migração

Autenticação, persistência em nuvem, pagamentos, agenda, chat interno, notificações e localização precisa permanecem fora do primeiro baseline. O app trabalhará com dados locais de demonstração enquanto a camada de produto não for conectada a um backend.

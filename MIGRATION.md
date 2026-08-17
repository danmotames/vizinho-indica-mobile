# Migração Nativa — Vizinho Indica

## Resultado

O Vizinho Indica foi reconstruído como aplicativo React Native + Expo, voltado a iOS e Android. A versão usa Expo Router, TypeScript, `StyleSheet` e componentes nativos; a interface web anterior permanece apenas como referência de produto e composição visual.

## Design System aplicado

O app preserva a identidade aprovada com Manrope, fundo lavanda claro, superfícies brancas, azul de ação, cartões arredondados e CTA verde para WhatsApp. Os tokens nativos estão centralizados em `src/design/tokens.ts`, enquanto o tema compartilhado do Expo está configurado em `theme.config.js`.

## Fluxos implementados

| Área | Implementação |
|---|---|
| Início | Descoberta local, categorias, busca de entrada e recomendações por vizinhos. |
| Explorar | Busca textual, filtro por categoria, lista virtualizada e estado vazio. |
| Detalhe | Perfil de prestador, prova social, serviço, tags e retorno nativo. |
| Recomendar | Formulário com validação do campo principal, seleção de categoria e confirmação visual. |
| Perfil | Dados do morador, métricas, atividade e atalhos de preferências. |
| WhatsApp | Normalização de telefone, URL contextual, tentativa de abertura externa e feedback de sucesso/falha. |

## Estrutura relevante

```text
app/                       # Rotas Expo Router
components/                # Cartões, chips e feedback visual
src/design/                # Tokens da identidade
src/data/                  # Dados locais e filtro de descoberta
src/features/              # Telas e fluxos por domínio
src/hooks/                 # Integração de contato externo
src/lib/                   # Haptics e construção da URL do WhatsApp
tests/                     # Regras de busca e contato
```

## Validações executadas

| Comando | Resultado |
|---|---|
| `pnpm check` | Tipos TypeScript sem erros. |
| `pnpm lint` | Lint do Expo concluído. |
| `pnpm test` | Cinco testes aprovados; um teste pré-existente de logout permanece ignorado. |
| `npx expo export --platform web` | Rotas e bundles do Expo gerados. |
| `npx expo-doctor` | 18 de 18 verificações aprovadas. |

## Limites do baseline

Os dados de prestadores e o estado de publicação são locais e demonstrativos. Autenticação, sincronização em nuvem, geolocalização precisa, notificações, moderação e persistência de recomendações deverão ser conectadas quando houver requisitos de backend e produto para essas capacidades.

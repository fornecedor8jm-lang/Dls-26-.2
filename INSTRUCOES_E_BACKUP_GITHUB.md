# 🏆 INSTRUÇÕES DE BACKUP E ATUALIZAÇÃO DO GITHUB - COPA DLS 2026

Este documento foi gerado como garantia e backup do sistema da **Copa DLS 26**, contendo a lista dos arquivos atualizados e os passos caso você deseje atualizar o repositório do GitHub diretamente ou via exportação do Google AI Studio.

---

## 📌 Como Atualizar o Repositório no GitHub Manualmente

Se a sincronização automática com o GitHub estiver em pausa ou pendente:

### Opção 1: Baixar o Projeto em ZIP (Recomendado & Mais Rápido)
1. No canto superior direito do painel do **Google AI Studio**, clique no menu de configurações/exportação.
2. Selecione **Exportar como ZIP** ou **Baixar Código Fonte**.
3. Extraia o arquivo `.zip` no seu computador.
4. No seu repositório do GitHub (`fornecedor8jm-lang/Dls-26`), faça o upload/commit da pasta extraída ou envie via linha de comando (`git push origin main`).

---

## 📁 Principais Arquivos Modificados no Novo Layout

Caso queira copiar individualmente os arquivos atualizados para o GitHub:

1. **`src/App.tsx`**
   - Header, navegação principal com 5 abas (`INÍCIO`, `JOGOS`, `TABELA`, `TIMES`, `CONTATO`).
   - Botões de retorno e direcionamento no menu principal.

2. **`src/components/GroupStandings.tsx`**
   - Tabela de classificação em dois modos: **Texto Vertical** (ideal para WhatsApp) e **Tabela Clássica**.
   - Integração com o cálculo em tempo real dos 8 grupos (A a H).

3. **`src/components/MatchList.tsx`**
   - Tabela de jogos com seletores por **Rodada** (1, 2, 3) e por **Grupo** (A-H).
   - Modo Organizador/Admin isolado na parte inferior com senha.

4. **`src/components/ConfirmedTeamsView.tsx`**
   - Visualização organizada dos 32 clubes chaveados nos 8 grupos.

5. **`src/data/initialMatches.ts`**
   - Resultados oficiais cadastrados:
     - **Grupo A:** Bayern de Munchen 6 × 3 FC Bayern
     - **Grupo E:** Barcelona 4 × 2 Blue Lock

6. **`src/utils/storage.ts`**
   - Chave de armazenamento renovada para garantia de sincronização dos dados mais recentes (`copa_dls_matches_v12_group_a_bayern_fix`).

---

## 🛠️ Suporte & Contato de Administração
- **WhatsApp Oficial da Copa:** +55 096 99182-1516
- **Localização dos Jogos:** Moçambique (Horário Oficial CAT) & Brasil (BRT)

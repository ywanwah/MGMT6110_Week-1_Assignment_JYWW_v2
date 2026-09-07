# PROMPTS.md - AI Treasures Private Client RM Portal [Banking]
**Student:** [Jo Yeong Wan wah] · **Course:** MGMT 6110 · **Problem Set 1**
**User sentence:** A [Relationship Manager in a Private Bank] opens this screen to [Monitor and Assess her client's portfolio balances and performance], and knows it worked when [she is able to view windows showing her customer's main financial product 360 profile dashboard, 5-year future potential trajectory of portfolio, RM's potential revenue of cross-selling products and insights to top competitors with market intelligence].
**Live link:** [https://mgmt-6110-week-1-assignment-jyww-v2.vercel.app/]
---
## Prompt 1 - the master prompt
```
ROLE: You are a senior front-end developer building a React web app for a Private Bank Relationship Manager team.
GOAL: Build the front end of customer’s information and products owned with a bank, a web product for [Relationship Manager in a Bank that retrieves a customer’s information and products owned, with top 5 products owned with the bank, ie Mortgages, Deposits, Credit Card, Wealth Management, Insurance]
Their job on this product is [Manage the customer’s portfolio and identify cross-selling opportunities]. 
Screens:
1) [SCREEN 1: The current banking products customer held with the bank and the customer financial information] what it shows; what the user does on it; what they see when it worked]
2) [SCREEN 2, based on the customer profile and 5 years financial planning into the future, what other products is available for the customers]
3) [SCREEN 3, potential fees and revenue inflow for the relationship manager]
OUTPUT: A running app. Keep every invented value in ONE data file of its own, with at least [10] rows, so the screen looks real. One component per screen or section. Move between screens without reloading the page. Readable on a phone at arm's length. When you are done, list the files you created and what each one holds.
GUARDRAILS: Screens and invented data only. Do NOT call the Gemini API or any other model. Do NOT call any outside service or fetch from any URL. No database, no login, no user accounts, no analytics. No features I did not list. No real company's name, logo, or trademark. Invented names and numbers only, nothing confidential.
CONTEXT: Individual Problem Set 1 for MGMT 6110 Human-AI Collaboration at SMU. Built in Google AI Studio, shared as a link, and opened on a phone by classmates in Week 3. I am not a programmer: when you make a choice I did not specify, say so in one line rather than burying it.
```
**What came back:** A running app, 7 files, preview loaded. It also added settings page I never asked for.
**What I changed next and why:** Added "no settings page" to the Guardrails, because a missing guardrail is why it appeared.
---
## Prompt 2 - fix the empty state
```
When the list has no rows, show "Nothing due today" instead of an empty table.
Change nothing else.
```
**What came back:** Correct, one file touched.
**What I changed next and why:** Nothing. Moved to the next item on the Goal list.
---
## Prompt 3 - fix the Logo to show AI Treasures RM Portal to the Guardrails, because a missing guardrail is why it showed a market base bank (1) UBS and then (2) DBS
---
## Prompt 4 - fix the Relationship Manager name to Jo Yeong to Guardrails so it does not showed a randomly generated name.
---
## Prompt 5 - Added text box as note for commentaries as 'RM Call Notes' and 'Commentaries'. 
---
## Prompt 6 - Added additional page to dashboard to include Market Insights for Top 3 Competitors products as Market Insights as Output. 

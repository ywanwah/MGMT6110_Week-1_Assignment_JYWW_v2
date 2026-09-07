Q1: Who are your users, and what changes for them?
Name them: Internal usage, for Private Bank Relationship Managers team of about 40-50 headcounts in Singapore. 
As of today, they need to use too many systems to complete their tasks and that data is not seamlessly integrated across all systems. 
They would need to open a few systems, ie system that contains customer information with KYC checked, and separate system to check for client portfolio balances.
They would also not be able to push for product sales through the dashboards, it would need to be separately engaged, and also checked through internal systems for new product offerings or cross selling that could match customer's 5-year potential future
trajectory.
They would also not be able to check Risk Rating live with collaterals information in same dashboard. These are usually Risk Team only information.
Competitor's analysis would need to be manually checked and extracted to market insight systems separately.
In addition, I added a counter-pitch to the customer's considered Top 3 brand for the RM.
Relationship Manager Teams (Customer Acquisition Team), KYC Teams for client onboarding, Market Insights and Product Teams for new product features.
This consolidated live AI RM Portal could save every RM with instance view of customer's profile, position and potential pipeline revenue 
that would require approximately minimum 1 hour of manual research, extraction and compilation effort per customer profile.

---
Q2: Augmented capacity and constrained capacity
Augmented capacity: 
I had a working interface in 60 minutes having never written a line of React, and the time went into deciding what the 3 screens need to show. 

---
Constrained capacity: 
(1) As I have no real live data, the numbers generated were from the AI which I could not validate.
(2) Same as the competitor's product, without real live data, I could not validate if these are indeed brand competitors.
(3) I also did not request for model to generate cross-border (SG/USD exposures, Zurich, New York Markets) and it has assumed that 
PB Wealth contains cross-borders portfolio with a 'CEO' level customer profile.
(4) Not being a code-base programmer and UI designer, I had to rely on Google AI to dictate the design of the dashboards base 
market data it was exposed to.

----
Q3: In the loop
Where judgment changed the outcome:
(1) Prompt 6: I added a counter-pitch to the Top 3 competitor's product and add in additional notes and commentaries space for RM's information trail.
(2) Prompt 5: I also added Market Insights as additional intel to for live comparison and market awareness.
(3) Prompt 3: Minor change to logos so not to use real-live FI replicas.
(4) Original Prompt: 3 tabs which include Customer Profile Dashboard, 5-year potential trajectory, Revenue potential forecast for RM, Market Insights.

Where nominally in the loop and added nothing:
(1) Overall design
(2) The 5-year trajectory/forecast of customer's potential wealth remain the riskiest part, impacting RM's potential revenue.
I am not able to validate the variables inputs that projected the customer's forecasted wealth and if any further market data is included.
If the valuation is forecasted wrongly, it would project the wrong products to be cross-sell and also put the customer in a riskier position.
This underlying valuation and forecasting models would need to be checked and variable factors to be validated.
The FI/Bank would need to bear the reputational loss of wrong advise and product sold, if models remained unvalidated.

---
Q4:
(1) It added what I never asked for. I never asked it to pull a multiple location portfolio and markets, though this has turned out
better than I would have designed.
(2) I would have wanted more dynamic visualisation, ie Live Market Data instead of Live Global News as bulletin.
(ie Silicon Valley news ect).

---
Q5:
# Governance Framework:
Accountability: Executive level owns AI outcome, in this case, it would be jointly held by CTO and Business Line Director.
Transparency: The model for the specific decisions with data touch points would need to be documented, validated and tested by 
data and business owners:
(a) Customer data - Customer Onboarding Team / Operation team for ongoing customer maintenance / KYC Team
(b) Customer Risk data - Risk Teams
(c) Pricing and valuation - Product pricing and actuarial teams
(d) Technology built and Data Teams - codes to be tested before launch, review and signed off in CTO teams.
(e) Overall testing resides with Business Product Owners to validate suitability and customer data accuracy running through
the dashboards.
Auditability: Every automated action generates an immutable record for auditors and regulators.
Model validation: Test models continuously, not once at launch, with policy for regression/back-testing and sign-offs with
business teams, ie Risk, Pricing, Product Teams.

# The AI implementation would need to go through the following phases to ensure no fallouts if key implementors leave the implementation:
1) Step 1: Assessment and planning: Identify gaps between where you are and where you need to be. Engage stakeholders across business lines to understand how they would use the AI tool today. Prioritize the most critical vulnerabilities first.
2) Step 2: Step 2: Framework design
Define governance structure. Assign specific roles and responsibilities for model oversight. Establish a dedicated committee to review high-risk deployments.
Write policies that dictate how models get approved and monitored. Align these rules with existing compliance functions. Create clear escalation paths for unexpected model behavior.
3) Step 3: Implementation
Deploy governance controls across the entire AI lifecycle. Establish strict model validation protocols before any system goes live.
Run comprehensive data quality checks on all training inputs. Build approval workflows that require human sign-off for critical deployments. Connect these controls to existing risk management infrastructure.
4) Step 4: Monitoring and auditing
Implement continuous monitoring for every active model. Track performance degradation, model drift, and algorithmic bias in real time.
Build an immutable audit trail that satisfies regulatory evidence requirements. Static annual reviews don't work for dynamic AI systems.
Enable alerts that fire the moment a model starts behaving unexpectedly.
AI models must undergo bias testing and human review, especially for high-impact decisions like automated lending or investment recommendations.
Dashboards should provide real-time monitoring of model outputs, fairness metrics, and audit trails to ensure accountability.
6) Step 5: Feedback and improvement
Create feedback loops that surface operational issues quickly. Use this data to drive continuous improvement in the governance program.
7) Step 6: Update training programs regularly to keep staff informed of new risks.

# Ensure compliance with regulatory requirements:
1) Private AI Architecture: Deploy AI in isolated, secure environments to ensure data privacy, compliance, and traceability.
2) Regulatory Alignment: Map dashboard metrics to regulatory requirements (MAS FEAT, PDPA, EU AI Act) to simplify reporting and audit readiness.
3) Vendor and Third-Party Risk: Where AI solutions involve third-party models or data providers. Readily available dashboards must track vendor compliance, model provenance, and ongoing performance monitoring to mitigate operational and regulatory risks.

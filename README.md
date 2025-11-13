# aplicatieinchirieri

Aplicatie pentru inchirieri ATV.

## Project Goals
- Provide an end-to-end digital experience for booking ATV rentals in Romanian tourist destinations.
- Reduce manual coordination by centralizing availability, pricing, and customer data.
- Enable operators to manage fleets, schedules, and maintenance tasks efficiently.
- Support secure online payments and transparent rental agreements for renters.

## Key Personas
- **Renter (Tourist/Local Adventurer):** Wants to discover available ATVs, compare prices, and book a rental quickly from a mobile device.
- **Rental Administrator:** Manages the fleet inventory, approves bookings, tracks maintenance, and communicates with renters.
- **Business Owner:** Monitors performance, oversees pricing strategies, and reviews financial metrics.

## High-Level Features
- Searchable catalog of ATVs with availability calendars and detailed specifications.
- Guided booking flow including identity verification, rental terms acknowledgment, and digital signatures.
- Admin dashboard for fleet management, booking approvals, and maintenance scheduling.
- Integrated messaging between renters and administrators for clarifications or support.
- Secure payment processing with receipts and automated refund handling.
- Mobile-responsive UI optimized for quick booking and check-in on-site.

## Primary User Stories

### Renter Flow
1. As a renter, I want to browse available ATVs filtered by location, date, and price so I can find an option that fits my trip.
2. As a renter, I want to complete the booking online, including uploading identification and signing the rental agreement, so I can confirm my reservation before arriving.
3. As a renter, I want to receive notifications and reminders about my booking so I stay informed about pickup instructions and policies.

### Admin Flow
1. As an admin, I want to review incoming booking requests and approve or decline them based on availability and renter history.
2. As an admin, I want to track maintenance schedules and flag ATVs as unavailable when service is required.
3. As an admin, I want to manage pricing, promotions, and fleet details through a centralized dashboard.

### Payment Flow
1. As a renter, I want to pay securely using credit/debit cards or digital wallets so that my booking is confirmed instantly.
2. As a renter, I want to see a detailed breakdown of charges, deposits, and taxes before I finalize payment.
3. As an admin, I want to process refunds or adjustments and keep an audit trail of all transactions.

## Technical Constraints
- Must run on shared hosting environments without requiring container orchestration.
- Application should support responsive layouts for mobile, tablet, and desktop devices.
- Payment integration must comply with PCI-DSS guidelines and support 3-D Secure where applicable.
- Localization support for Romanian language by default with extensibility for additional languages.
- Data storage must rely on a relational database compatible with common managed services (e.g., MySQL, PostgreSQL).
- System should expose APIs that can integrate with third-party booking aggregators.

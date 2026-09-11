import { NextResponse } from 'next/server';

const MAX_TURNS = 20;
const MAX_CHARS = 1500;

export const dynamic = 'force-dynamic';

export async function POST(req) {
  // Read env inside the handler — module-scope reads can capture an empty value
  // on a cold instance before app settings are injected.
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

  try {
    if (!apiKey) {
      return NextResponse.json({ message: 'Server is missing GEMINI_API_KEY.' }, { status: 500 });
    }

    const { messages } = await req.json();

    const trimmed = Array.isArray(messages) ? messages.slice(-MAX_TURNS) : [];
    if (trimmed.some((m) => typeof m.content === 'string' && m.content.length > MAX_CHARS)) {
      return NextResponse.json({ message: 'That question is too long — try a shorter one.' }, { status: 400 });
    }

    const systemPrompt = `You are PortfolioGPT, answering only questions based on the resume provided.

Resume:
${DATA_RESUME}

Readers are usually technical managers, directors and VPs evaluating Raj for a lead or architect role, so
lead with scope, outcomes and cost, and keep tool detail to what the question asks for.

Help users learn more about Raj from his resume. Answer in the first person as Raj, cite the role and
year an answer comes from, and keep replies to a short paragraph. If the answer is not in the resume,
say you do not see that information in the resume and point them to rajkumar.thanudhasan@gmail.com.

If asked what kind of work Raj wants, what he is looking for, or whether he is available: he is open to
Lead Developer and Solution Architect roles in RPA and intelligent automation, including leading a CoE,
and can be reached at rajkumar.thanudhasan@gmail.com or (407) 409-0749.`;

    const conversation = trimmed
      .map((m) => {
        const role = m.role === 'assistant' ? 'Assistant' : m.role === 'system' ? 'System' : 'User';
        return `${role}: ${typeof m.content === 'string' ? m.content : ''}`;
      })
      .join('\n');

    const prompt = `${systemPrompt}

Conversation:
${conversation}

Respond helpfully and briefly.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API error:', data);
      return NextResponse.json(
        { message: data?.error?.message || 'Gemini API request failed.' },
        { status: response.status }
      );
    }

    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((p) => p.text || '')
        .join('')
        .trim() || 'No response returned.';

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error('Route error:', error);
    return NextResponse.json(
      { message: 'Unexpected server error: ' + (error && error.message ? error.message : String(error)) },
      { status: 500 }
    );
  }
}

const DATA_RESUME = `Rajkumar Thanudhasan
www.rajkumarthanudhasan.com
rajkumar.thanudhasan@gmail.com
(407) 409-0749
linkedin.com/in/rajkumarthanudhasan/
Education
Master's in engineering management with I.T specialization, from Christian Brothers University with 4.0 GPA.
Bachelor’s in computer science, from Amrita Vishwa Vidyapeetham, Coimbatore with a 3.2 GPA.
RPA Certification: RPA Developer Certificate – UiPath 	ID: 335060836941348828
RPA Orchestrator 2018.2 Diploma – UiPath 	ID: 379 30 191172 1553965257
RPA Security Training Diploma – UiPath 	ID: 458 57 191172 1553974181
Robotic Process Automation Professional – Blue Prism 	ID: Verify
Technical Skills
Automation and Intelligent
Automation:
UiPath Studio, Orchestrator, REFramework, Power Automate, Kindo AI Agents,
Document Understanding, Process Mining, Task Mining, Communications Mining,
Automation Hub, ABBYY OCR; reusable frameworks, queues, triggers, and exception
handling
Development, Databases, and
Integration:
Python, C#/.NET, SQL, HTML, XML; SQL Server, MySQL, Oracle Database, Caché; Visual
Studio, PyCharm, IntelliJ IDEA, Eclipse, RIDE; API integration, Postman, NuGet, GitHub,
GitLab, Bitbucket, Jenkins
Enterprise, and Reporting
Applications:
Oracle ERP, Salesforce, AppZen, SharePoint, ServiceNow, SSRS; reporting automation
across SYNKROS, Stadium PLEE, GM Atlas, IGT EZ Pay, XpertX, Agilysys LMS, and
InfoGenesis; comp-entry automation in iSeries CMS
Solution Design, Delivery, and
Operations:
PDD/SDD, process mapping, development standards, code reviews, Jira, Confluence,
MS Project, Aha!, AgileCraft, MS Visio, Visual Paradigm; production monitoring,
incident resolution, VM migration, licensing, and workload planning.
Test Automation and Quality
Assurance:
Robot Framework, Selenium WebDriver, HP UFT/QTP, HP ALM, Zephyr, TestNG, JUnit,
AutoIt, Sikuli; regression testing, UAT, and custom .NET test libraries
Work Experience
1. Station Casinos 	June 2025 – till Date
Lead Software Developer/ Solution Architect(Compliance Team)
● Architect and maintain enterprise automation solutions, partnering directly with the Director/VPs to define
strategy, solution designs, implementation roadmaps, and delivery priorities.
● Designed a reusable framework for sequence-based processes, established development standards, and migrated
approximately 160 inherited automations; developed 21 additional processes using UiPath REFramework.
● Increased production success rates from approximately 85% to 94% and reduced daily developer troubleshooting
effort by more than 75%, from at least four hours to under one hour, through framework and operational
improvements.
● Own production operations for 241 processes supported by 11 unattended bots, with 180+ processes running
daily; oversee monitoring, incident resolution, and recovery, and standardized production VMs while completing
their migration from Windows 10 to Windows 11.
● Developed 21 processes using UiPath REFramework to support business automation requirements alongside the
standardized sequence-based framework.
● Conceived, architected, and developed a SharePoint self-service portal integrated with Power Automate and
UiPath Orchestrator APIs, enabling business teams to initiate automations on demand.
● Built and deployed a Kindo AI agent that reviews ServiceNow tickets to assess new-hire application access against
compliance policies and supplies assessment results to downstream UiPath workflows.
● Automated report generation and delivery across casino and enterprise applications, including Stadium,
OracleGM, Atlas, EZpay, SSRS, CMS, LMS, Infogen, Synkros, FileBound, and XpertX.
● Own licensing, budget decisions, hiring, and automation prioritization; lead workload planning and task allocation
across production support, enhancements, and new development within a three-person team.

2. Dish Network 	May 2024 – June 2025
Senior Software Developer/Architect(Intelligent Automation - CFO Team)
● Implemented a couple of full life cycles of RPA Automation here at Dish for the Fixed Assets Team involving
applications like Oracle Fusion Cloud ERP, Aura Player, NexSysOne, and Orbit reports.
● Used OCR tools like Abbyya and AI tools like Appzen to improve efficiency and optimize RPA projects for the
Accounts Payable team.
● Reviewing the applications involved for each process and deciding the Automation approach, which is most
important for every automation to get the best results.
● Constant communication with the business partners to develop and deploy their ideas. Also, ensuring that there
is a clear establishment of what can be created within what timeframe and what are its requirements.
● Well-experienced in understanding the API documentation and building the required API call for the process.
● Used Python for some of the automation where it was required to read HTML and PDF documents. Also used
UiPath Document Understanding for automations that require getting data from the PDF.
● Expertise in handling exceptions and involved in optimizing the business process to get 95% success rates by
Automation.
3. Nielsen 	June 2019 – May 2024
Robotic Process Automation Developer/Architect
Products: TLR (Total Line Reporting) SalesForce, Bi Reports, iHeart Reporting
● Collaborated with senior leaders and key stakeholders to design and implement RPA solutions that met business
needs and reduced annual expenses by nearly $500,000.
● Provided process analysis and recommendations to Senior Management on the RPA ecosystem, license types and
numbers, and resource, time, and cost savings.
● Established robust and scalable development, testing, and production environments for end-to-end automation
projects that generated over a million dollars in revenue annually.
● Conducted architectural discussions/reviews of RPA stories and implemented the BOT using RE Framework,
dispatcher, performer BOTs, queues, and triggers.
● Designed stable/reusable and scalable RPA solutions for automation involving Oracle EBS ERP using the UiPath RE
framework and followed the best practices agreed upon in the organization.
● Coordinated with the CoE and the stakeholders on the best practices for RPA solutions.
● Started identifying processes using Process Mining and improved them using Communications Mining, and
Document Understanding.
● Optimized most processes by utilizing API and improved its efficiency by 35% on average while maintaining high
data quality and accuracy.
● Reviewed codes, managed licensing requirements, and orchestrated the process (robots, schedules, configuration
files, assets, queues, etc.).
● Documented the efforts in a process definition document (PDD) and a solution design document (SDD) (AS-IS,
TO-BE, and flow diagrams) using Task Mining, and Automation Hub.
Environment: UiPath Studio, UiPath Cloud Orchestrator, NET4.0, ASP.NET 4.0, C#, SQL Server, Oracle EBS ERP,
SalesForce, Visual Studio 2017, Alteryx, NuGet Package Manager, GitLab, Postman and AWS.
4. Nielsen Audio (Client) 	February 2017 – June 2019
RPA Developer
Products: PPM (Portable People Meter), PPM wearable, PPM BT Collector
● Worked on RPA automation for PPM (Portable People Meter), PPM wearable, and PPM BT Collector projects
using UiPath and RobotFramework to ensure the best quality of the applications, in an Agile practicing
environment.
● Worked with SMEs to create POD (Process Definition Document), and SDD (Solution Design Documents), plan RPA
test strategy, develop RPA automation suite, and execute and maintain the RPA test scenarios for PPM and all
related projects.
● Developed an automated solution containing PPM test cases, work queues, and environment using UiPath (RPA
testing framework) and integrated everything using Jenkins for CI/CD purposes.
● Played a significant role in successfully increasing PPM automation footprint coverage percentage from ~40% to
~82% by developing and updating the Automation Regression Suite using custom .NET libraries. Those updates

enable the automation suite to execute more efficiently.
● Experienced in using UiPath Studio, Orchestrator, Screen, Data & Web scraping tools. Also, I used Visual Studio
and NuGet package manager to create custom libraries for UiPath.
● Built four Automated Regression Test (ART) systems (i.e. PCs that integrated Motion simulation hardware,
Network power strips for BT beacons, Power circuit timers, Decibel meters, and Audio playback devices) to
support our RPA automation testing. This helped the team significantly to reduce the time to complete a
regression cycle from 60 days to two sprint cycles (20 days).
● Experienced in controlling the BOTs using RPA administrative/Orchestrator. Also, used the Windows task
scheduler to substitute the work done by Orchestrator.
● Part of a PPM wearable (Prototype) team to develop a RobotFramework Automation using Selenium library on
RIDE and PyCharm editor for keyword-driven development (KDD) to test PPM wearable devices. Also, was part of
a wearable proof of concept panel, and provided feedback to the field panel administrator.
● Part of a PPM Collector (Prototype) team in automating the functionality of the prototype PPM Collector made
from Raspberry Pi. Used the RPA tool UiPath to automate the entire test suite.
● Analyzed, developed, and documented business/test processes using Jira, Zephyr, and Confluence. Also, was part
of the FMEA team in identifying potential failure points in the BT Collector, PPM, and its related devices.
Environment: UiPath Studio, UiPath OnPerm Orchestrator, NET4.0, ASP.NET 4.0, C#, SQL Server, Visual Studio 2017,
NuGet Package Manager, Jenkins, Automation Anywhere, Microsoft Power Automate, Blue Prism.
5. Christian Brothers University 	August 2016 – December 2016
Research Assistant - RPA
● Analyzed the requirements of the stakeholders and prepared RPA design documents.
● The data collected was processed using open-source RPA tools and forwarded in the form of CSV files to a Ph.D.
student for further research. The work has been completely automated using RPA, and scripts are now
automatically run, and data is collected daily.
Environment: RIDE, PyCharm, SQL Server, GitHub, Sikuli, AutoIT.
6. BWAY Corporation 	June 2016 – August 2016
Summer Intern – RPA Analyst
Products: IMS (Inventory Management System)
Clients: In House Products
● Implemented end-to-end robotic process automation (RPA) by combining different types of applications
(Web-based, Windows-based, and mainframe) using UiPath.
● Supported the development of product deliverables in the product roadmap with the functional requirements
documents. Also, gradually built a knowledge base of new and existing functionality to improve requirements
process efficiency.
● Developed robotic bots using UiPath to automate the process which was done using manual interference.
● Performed database imports of client inventory, employee, supplier, and cost center data into various platforms
of SQL Server instances using RPA.
● Identified root cause and developed numerous custom activity libraries using Visual Studio and NuGet package
manager. Also, maintained various development builds using GitHub.
● Worked with the development team, QA team, and non-technical stakeholders throughout the SDLC process on a
story-by-story basis in identifying bottlenecks, testing, and refining each feature.
● Managed the backlog of user stories by working closely with the developers and assisting them with the business
and design questions as needed.
● Was responsible for User Acceptance Testing (UAT). Worked with the product owner to create UAT scripts.
● Developed standard operating procedures document and conducted user orientation and training on the
products.
Environment: UiPath Studio, UiPath Orchestrator, NET4.0, ASP.NET 4.0, C#, SQL Server, Visual Studio 2015, NuGet
Package Manager, GitHub, Oracle DB.
7. Christian Brothers University 	January 2016 – May 2016
Graduate Assistant
● Assisting the professor in teaching classes and grading assignments as well as clearing questions of students.

● Also conducting labs for the students to give them a practical knowledge of the subject.
8. Atlas Healthcare Software 	December 2011 – July 2015
Analyst
Products: Atlas LabWorks EMR, Enterprise Master Patient Index, EHR
Clients: Mayo Labs, Sunrise Labs, St. Jude, Baptist, AEL,.200 Clients.
● Supervised a team of 3 Junior Analysts, each specializing in a different product line.
● Member of the change management committee and was involved in change order proposal meetings with
clients. Managed the functional design portion of SDLC across multiple product lines utilizing both Waterfall and
Agile methodologies.
● Liaise between the business and technical personnel to ensure a mutual understanding of HIPAA processes and
applications.
● Engineered product designs, FSDs, BRDs, and UMLs to document the enhancement when required.
● Used Data Scraping method for extracting structured data from browser applications or documents into a CSV file
or Excel Spreadsheet.
● Worked on standard RPA framework for creating and designing the Sequences and processes.
● Built a system for statistical reports and conceptualized designs for an entire billing module for the application.
● Responsible for providing functional training and support to members across all teams in the organization.
● Designed RPA test case suits and performed user acceptance testing (UAT), monitored client workflows for
possible design and UI gaps.
9. Sri Balaji Web Hosting 	May 2011 – December 2011
PHP developer
Products: In-house e-mail and SMS module
● Worked as a PHP developer for 6 months gaining insight about how to develop and host websites.
● Engineered user activity diagrams to chart the functional workflow across the product.
● Have done many projects in PHP, one of which is an SMS and E-MAIL Module for Experts Academy (a consulting
firm located in Chennai) and two plug-in modules.
● Provided full-end testing support to all departments across SDLC.

`;

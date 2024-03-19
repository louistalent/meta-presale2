
'use client'
// pages/index.js
import { useEffect } from 'react';

const faqs = [
    {
        question: 'Whats META?',
        answer: 'META - The fully decentralized protocol for launching new ideas. An all-in-one Incubation Hub with a full-stack Defi platform based on Runes',
    },
    {
        question: 'Whats the initial roadmap of $META ?',
        answer: '$META is scheduled for launch on the inaugural day of the Runes release, with project incubation commencing promptly thereafter.',
    },
    {
        question: 'How do I buy $META ?',
        answer: 'The majority of the $META supply will be offered during the presale phase prior to the upcoming Bitcoin halving/Runes launch.',
    },
    {
        question: 'Whats the long term plan of META',
        answer: 'Provide sustainable tools and products to the Runes and META community, Incubate numerous projects weekly, and Generate benefits for $META holders. ',
    },
    {
        question: 'Whats the total supply of $META?',
        answer: '21,000,000 Tokens ',
    },
    {
        question: 'Where can i trade $META ?',
        answer: '$META will be listed on one or two exchanges on the day of launch, as well as on other on-chain markets.',
    },
    {
        question: 'Whats the utility of $META?',
        answer: 'The primary advantage for holders is the HODL Airdrop program, where each new project hosted is required to airdrop 2% of their total supply to $META holders. This program ensures that $META holders benefit from ongoing airdrops whenever new projects are introduced.',
    },
    {
        question: 'Is META free to use?',
        answer: 'Indeed, META does not impose any platform fees for activities such as launching, minting, or inscribing.',
    },
    {
        question: 'Who is eligible for the free $META airdrop?',
        answer: 'The top 1,000 META Zealy campaign users will receive an airdrop of 1,000 tokens each.',
    },
    {
        question: 'Where can i learn more about META ?',
        answer: 'docs.MetaRunes.io',
    },
];

const Accordion = () => {
    useEffect(() => {
        const buttons = document.querySelectorAll('.accordion-header');

        const handleClick = (event) => {
            const button = event.currentTarget;
            const accordionContent = button.nextElementSibling;

            button.classList.toggle('active2');

            if (button.classList.contains('active2')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            } else {
                accordionContent.style.maxHeight = 0;
            }

            // Close other open accordion items
            document.querySelectorAll('.accordion-header').forEach(otherButton => {
                if (otherButton !== button) {
                    otherButton.classList.remove('active2');
                    otherButton.nextElementSibling.style.maxHeight = 0;
                }
            });
        };

        buttons.forEach(button => {
            button.addEventListener('click', handleClick);
        });

        return () => {
            buttons.forEach(button => {
                button.removeEventListener('click', handleClick);
            });
        };
    }, []);

    const faqSection1 = faqs.slice(0, 5);
    const faqSection2 = faqs.slice(5);

    return (
        <div className="accordion-container">
            {faqs.map((faq, index) => (
                <div className="accordion-item" key={index}>
                    <button className="accordion-header">
                        {faq.question} <span className="icon">+</span>
                    </button>
                    <div className="accordion-content">
                        <p>{faq.answer}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default function Faqs() {
    return (
        <main>
            <div className="inscribe">
                <div className="faqs-box">

                    <h1>FAQs</h1>
                    <Accordion />
                </div>
            </div>
        </main>
    );
}

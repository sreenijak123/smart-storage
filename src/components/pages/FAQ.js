import React from 'react';

const FAQ = () => {
  const faqData = [
    {
      question: 'What is Smart Storage?',
      answer: 'Smart Storage is a platform designed to help you organize and manage your storage items efficiently.',
    },
    {
      question: 'How do I add new items?',
      answer: 'Go to the "Add Item" section, fill out the details, and click save to add an item to your storage.',
    },
    {
      question: 'How do I contact customer support?',
      answer: 'You can contact us at +1 (945) 444-2560 for further assistance.',
    },
  ];

  return (
    <div>
      <h2>Frequently Asked Questions</h2>
      <ul>
        {faqData.map((faq, index) => (
          <li key={index}>
            <strong>{faq.question}</strong>
            <p>{faq.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQ;

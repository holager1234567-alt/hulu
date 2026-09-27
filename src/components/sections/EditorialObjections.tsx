const objections = [
  {
    question: '"מה אם זה לא ייראה כמו שדמיינתי?"',
    answer: 'בדיוק בשביל זה יש דמו. את רואה את הכיוון העיצובי והמסר לפני כל תשלום.',
  },
  {
    question: '"אין לי זמן לפרויקט גדול."',
    answer: 'ההשקעה שלך בהתחלה היא 10 דקות של שאלון ושיחת זום קצרה. את כל העבודה הכבדה אנחנו לוקחות.',
  },
  {
    question: '"אני לא יודעת מה לכתוב על עצמי."',
    answer: 'את לא צריכה לדעת. השאלון בנוי כדי לחלץ ממך את מה שחשוב, ואנחנו הופכות את זה לקופי שמוכר.',
  },
  {
    question: '"זה באמת יביא לי לקוחות?"',
    answer: 'הדף בנוי סביב מטרה אחת, להפוך מתעניינות למשלמות. כל כותרת, כל אנימציה וכל כפתור מכוונים לשם.',
  },
] as const

export function EditorialObjections() {
  return (
    <section id="faq" className="editorial-objections" aria-labelledby="editorial-objections-heading">
      <div className="editorial-objections-inner">
        <h2 id="editorial-objections-heading" className="editorial-section-heading">
          את לא צריכה לקנות חתול בשק.
          <br />
          את רואה את הדף לפני שאת מתחייבת.
        </h2>
        <p className="editorial-section-lead">
          רוב בעלות העסקים חוששות להשקיע באתר ולגלות בסוף שהוא לא מה שדמיינו. בגלל זה בנינו
          תהליך הפוך. קודם את רואה, ורק אז מחליטה.
        </p>

        <div className="editorial-objections-grid">
          {objections.map((item) => (
            <article key={item.question} className="editorial-objection">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>

        <p className="editorial-section-strong">דמו קודם. החלטה אחר כך. שקט מלא לאורך כל הדרך.</p>
      </div>
    </section>
  )
}

const replies = [
  'ואת עונה.',
  'מסבירה מה כלול.',
  'שולחת עוד הודעה.',
  'מקליטה הקלטה.',
  'עונה על עוד שאלה.',
] as const

export function EditorialPain() {
  return (
    <section className="editorial-pain" aria-labelledby="editorial-pain-heading">
      <div className="editorial-pain-inner">
        <h2 id="editorial-pain-heading" className="editorial-section-heading">
          החפירות בוואטסאפ נגמרו.
        </h2>

        <div className="editorial-pain-copy">
          <div className="editorial-pain-group">
            <p className="editorial-pain-line editorial-pain-line--lead">את מכירה את הרגע הזה.</p>
            <p className="editorial-pain-line editorial-pain-line--body">
              מגיעה הודעה. "היי, כמה זה עולה?"
            </p>
          </div>

          <div className="editorial-pain-group editorial-pain-stack">
            {replies.map((line) => (
              <p key={line} className="editorial-pain-line editorial-pain-line--body">
                {line}
              </p>
            ))}
          </div>

          <div className="editorial-pain-group">
            <p className="editorial-pain-line editorial-pain-line--body">
              ואחרי שעה של הסברים, היא כותבת
            </p>
            <p className="editorial-pain-line editorial-pain-line--quote">"תודה, אני אחשוב על זה."</p>
          </div>

          <div className="editorial-pain-group">
            <p className="editorial-pain-line editorial-pain-line--body">ואז זה קורה שוב. ושוב.</p>
            <p className="editorial-pain-line editorial-pain-line--body">
              עם עוד ליד קר, שבכלל לא הבין מה את עושה.
            </p>
          </div>

          <div className="editorial-pain-group">
            <p className="editorial-pain-line editorial-pain-line--truth">
              הבעיה היא לא בשירות שלך. הוא מעולה.
            </p>
            <p className="editorial-pain-line editorial-pain-line--emphasis">
              הבעיה היא שאת עושה את העבודה של הדף בעצמך, ידנית, כל יום מחדש.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מי אני – לימור בכר',
  description: 'הכירי את לימור בכר, סטייליסטית אישית לנשים. הסיפור שלי, הפילוסופיה שלי.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <h1 className="font-frank mb-8 text-4xl font-bold text-charcoal">אודותי</h1>

      <div className="prose prose-lg max-w-none leading-relaxed text-gray-700">
        <p>
          לא תמיד הייתי כזאת. היו ימים שעמדתי מול הארון שלי ולא ידעתי מה ללבוש — בחרתי שחור כי
          זה "בטוח", לבשתי מה שהסתיר, לא מה שהראה. ועד שהבנתי שהבעיה לא בגוף שלי — היא
          בכך שלא ידעתי איך ללבוש אותו נכון.
        </p>
        <p>
          היום אני עוזרת לנשים — בעיקר בנות 50 ומעלה — לגלות שיש להן סגנון. תמיד היה. הוא רק
          חיכה שמישהו יעזור להן למצוא אותו.
        </p>

        <h2>אני מאמינה</h2>
        <p>
          שסטיילינג הוא לא רק בגדים — הוא ביטוי עצמי, ביטחון, ואהבה עצמית. כשאישה מרגישה טוב
          במה שהיא לובשת, זה משנה איך היא מתנהלת בעולם.
        </p>

        <h2>אני מרגישה</h2>
        <p>
          מבורכת שאני יכולה לעזור לנשים למצוא את עצמן — לא את מה שהאופנה אומרת, אלא את מה שמתאים
          להן אישית.
        </p>

        <h2>אני מתחייבת</h2>
        <p>
          לליווי אישי, סבלני ומלא. כי כל אישה היא עולם ומלואו, עם גוף, צבעים וסגנון ייחודיים.
        </p>

        <h2>אני מבטיחה</h2>
        <p>
          שאחרי תהליך הסטיילינג, תדעי איך להתלבש לבד. לא תזדקקי לי עבור כל קנייה — אלא תיקחי
          את הכלים הלאה לחיים.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noreferrer"
          className="btn-outline text-center block"
        >
          הצטרפי לדף הפייסבוק שלי
        </a>
        <a href="/contact" className="btn-gold text-center block">
          להרשמה למבצעים
        </a>
      </div>
    </div>
  )
}

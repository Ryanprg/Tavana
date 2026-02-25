import { Hono } from 'hono'

type Bindings = {
  DB: D1Database
  HF_API_TOKEN?: string
  HF_MODEL?: string
  AUTH_SECRET?: string
}

const app = new Hono<{ Bindings: Bindings }>()

const site = {
  name: 'توان‌مارکت',
  description:
    'بازار آنلاین محصولات و خدمات تولیدشده توسط توان‌یابان با تمرکز بر اشتغال پایدار، فروش عادلانه و رشد سئو',
  url: 'https://example.com'
}

const categories = [
  'صنایع دستی',
  'خوراکی سالم',
  'پوشاک و اکسسوری',
  'محصولات دیجیتال',
  'خدمات خانگی',
  'آموزش و مشاوره'
]

const featuredProducts = [
  {
    id: 1,
    title: 'سبد حصیری دست‌باف',
    price: '۴۸۰٬۰۰۰',
    seller: 'نرگس محمدی',
    city: 'اصفهان',
    category: 'صنایع دستی',
    badge: 'دست‌ساز'
  },
  {
    id: 2,
    title: 'شکلات تلخ خانگی',
    price: '۲۲۰٬۰۰۰',
    seller: 'علی رستمی',
    city: 'تبریز',
    category: 'خوراکی سالم',
    badge: 'پرفروش'
  },
  {
    id: 3,
    title: 'روسری ابریشمی',
    price: '۶۵۰٬۰۰۰',
    seller: 'فرشته قاسمی',
    city: 'شیراز',
    category: 'پوشاک و اکسسوری',
    badge: 'جدید'
  }
]

const blogPosts = [
  {
    slug: 'impact-economy',
    title: 'اقتصاد اثرگذار و نقش توان‌یابان در بازار آنلاین',
    excerpt:
      'چطور یک بازار آنلاین می‌تواند همزمان فروش را افزایش دهد و به ایجاد فرصت‌های شغلی پایدار کمک کند.'
  },
  {
    slug: 'seo-for-social-commerce',
    title: '۱۰ نکته سئو برای فروشگاه‌های اجتماعی',
    excerpt:
      'چک‌لیست سئو فنی و محتوایی برای رشد سریع صفحات محصول و وبلاگ.'
  },
  {
    slug: 'storytelling',
    title: 'داستان‌گویی برای برندهای انسان‌محور',
    excerpt:
      'چگونه روایت‌های انسانی باعث اعتمادسازی و افزایش نرخ تبدیل می‌شوند.'
  }
]

const roles = [
  {
    title: 'مدیر کل',
    desc: 'کنترل نهایی تنظیمات سایت، پرداخت‌ها و سیاست‌ها.'
  },
  {
    title: 'فروشنده',
    desc: 'ثبت محصول، مدیریت سفارش و ارائه خدمات.'
  },
  {
    title: 'خریدار',
    desc: 'خرید محصولات، ثبت نظر و دریافت مشاوره.'
  },
  {
    title: 'ویرایشگر محتوا',
    desc: 'مدیریت وبلاگ، صفحات سئو و انتشار محتوا.'
  },
  {
    title: 'پشتیبان',
    desc: 'رسیدگی به تیکت‌ها، ارتباط با فروشندگان و مشتریان.'
  },
  {
    title: 'تحلیلگر رشد',
    desc: 'بررسی اینسایت‌ها و ارائه پیشنهاد به مدیر.'
  }
]

const seoJsonLd = `{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "${site.name}",
  "url": "${site.url}",
  "description": "${site.description}",
  "foundingDate": "2024",
  "sameAs": [
    "https://instagram.com",
    "https://www.linkedin.com"
  ]
}`

const baseLayout = ({
  title,
  description,
  content
}: {
  title: string
  description: string
  content: string
}) => {
  return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="robots" content="index,follow" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="fa_IR" />
    <meta property="og:site_name" content="${site.name}" />
    <link rel="canonical" href="${site.url}" />
    <link rel="stylesheet" href="/static/style.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;300;400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />
    <script src="https://cdn.tailwindcss.com"></script>
    <script type="application/ld+json">${seoJsonLd}</script>
  </head>
  <body class="bg-slate-50 text-slate-900">
    ${nav()}
    <main class="mx-auto max-w-6xl px-4 pb-16 pt-10">${content}</main>
    ${footer()}
    <script src="/static/app.js"></script>
  </body>
</html>`
}

const nav = () => {
  return `
    <header class="border-b border-slate-200 bg-white">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-lg font-bold text-white">
            ت
          </div>
          <div>
            <p class="text-lg font-bold">${site.name}</p>
            <p class="text-xs text-slate-500">بازار انسان‌محور محصولات توان‌یابان</p>
          </div>
        </div>
        <nav class="hidden items-center gap-6 text-sm font-medium md:flex">
          <a class="hover:text-emerald-600" href="/">خانه</a>
          <a class="hover:text-emerald-600" href="/shop">فروشگاه</a>
          <a class="hover:text-emerald-600" href="/blog">وبلاگ</a>
          <a class="hover:text-emerald-600" href="/seller">پنل فروشنده</a>
          <a class="hover:text-emerald-600" href="/admin">پنل مدیریت</a>
        </nav>
        <div class="flex items-center gap-2">
          <a
            class="rounded-full border border-emerald-600 px-4 py-2 text-sm font-medium text-emerald-700"
            href="/shop"
            >مشاهده محصولات</a
          >
          <a
            class="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white"
            href="/auth"
            >ورود/ثبت‌نام</a
          >
        </div>
      </div>
      <div class="mx-auto flex max-w-6xl flex-wrap gap-3 px-4 pb-4 text-xs text-slate-500 md:hidden">
        <a class="hover:text-emerald-600" href="/">خانه</a>
        <a class="hover:text-emerald-600" href="/shop">فروشگاه</a>
        <a class="hover:text-emerald-600" href="/blog">وبلاگ</a>
        <a class="hover:text-emerald-600" href="/seller">پنل فروشنده</a>
        <a class="hover:text-emerald-600" href="/admin">پنل مدیریت</a>
      </div>
    </header>
  `
}

const footer = () => {
  return `
    <footer class="border-t border-slate-200 bg-white">
      <div class="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-3">
        <div>
          <h3 class="text-lg font-semibold">${site.name}</h3>
          <p class="mt-2 text-sm text-slate-500">
            ${site.description}
          </p>
        </div>
        <div>
          <h4 class="text-sm font-semibold">دسترسی سریع</h4>
          <ul class="mt-3 space-y-2 text-sm text-slate-500">
            <li><a href="/shop" class="hover:text-emerald-600">فروشگاه</a></li>
            <li><a href="/blog" class="hover:text-emerald-600">وبلاگ</a></li>
            <li><a href="/seller" class="hover:text-emerald-600">ثبت فروشنده</a></li>
            <li><a href="/admin" class="hover:text-emerald-600">مدیریت سایت</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-sm font-semibold">تماس</h4>
          <p class="mt-3 text-sm text-slate-500">support@tavanmarket.ir</p>
          <p class="text-sm text-slate-500">021-0000-0000</p>
        </div>
      </div>
    </footer>
  `
}

const homePage = () => {
  return `
    <section class="grid gap-8 md:grid-cols-2 md:items-center">
      <div>
        <p class="text-sm font-semibold text-emerald-600">بازار دیجیتال توان‌یابان</p>
        <h1 class="mt-3 text-3xl font-bold leading-tight md:text-4xl">
          فروشگاه انسان‌محور برای عرضه محصولات و خدمات توان‌یابان
        </h1>
        <p class="mt-4 text-base text-slate-600">
          بستری امن برای معرفی، فروش و رشد محصولات ساخته یا فرآوری شده توسط توان‌یابان، همراه با ابزارهای سئو و
          هوش مصنوعی.
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <a class="rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white" href="/shop">
            شروع خرید
          </a>
          <a
            class="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700"
            href="/seller"
          >
            ثبت‌نام فروشنده
          </a>
        </div>
        <div class="mt-6 grid gap-4 text-sm text-slate-500 md:grid-cols-3">
          <div class="rounded-2xl border border-slate-200 bg-white p-4">
            <p class="text-lg font-semibold text-slate-900">+۲۴۰</p>
            <p>فروشنده فعال</p>
          </div>
          <div class="rounded-2xl border border-slate-200 bg-white p-4">
            <p class="text-lg font-semibold text-slate-900">۹۸٪</p>
            <p>رضایت مشتریان</p>
          </div>
          <div class="rounded-2xl border border-slate-200 bg-white p-4">
            <p class="text-lg font-semibold text-slate-900">۴.۸/۵</p>
            <p>میانگین امتیاز</p>
          </div>
        </div>
      </div>
      <div class="grid gap-4">
        <div class="rounded-3xl border border-slate-200 bg-gradient-to-br from-emerald-50 to-white p-6">
          <h2 class="text-lg font-semibold">هوشمندسازی فروشگاه</h2>
          <p class="mt-2 text-sm text-slate-500">
            دسته‌بندی محصولات و مشاوره خرید با هوش مصنوعی فارسی، بهینه برای تجربه کاربر و سئو.
          </p>
          <div class="mt-4 grid gap-3 text-sm text-slate-600">
            <div class="flex items-center justify-between rounded-2xl bg-white p-3">
              <span>دسته‌بندی خودکار محصولات</span>
              <span class="text-emerald-600">فعال</span>
            </div>
            <div class="flex items-center justify-between rounded-2xl bg-white p-3">
              <span>مشاوره محصول بر اساس نیاز کاربر</span>
              <span class="text-emerald-600">فعال</span>
            </div>
            <div class="flex items-center justify-between rounded-2xl bg-white p-3">
              <span>فیلتر هوشمند نتایج</span>
              <span class="text-emerald-600">فعال</span>
            </div>
          </div>
        </div>
        <div class="rounded-3xl border border-slate-200 bg-white p-6">
          <h3 class="text-lg font-semibold">امکانات فاز اول</h3>
          <ul class="mt-3 grid gap-2 text-sm text-slate-600 md:grid-cols-2">
            <li>فروشگاه محصولات و خدمات</li>
            <li>پنل فروشنده و مدیریت</li>
            <li>وبلاگ و صفحات سئو</li>
            <li>مدیریت درگاه پرداخت</li>
            <li>جستجوی پیشرفته و فیلتر</li>
            <li>علاقه‌مندی و لیست محبوب‌ها</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="mt-14">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold">دسته‌بندی‌های محبوب</h2>
        <a class="text-sm font-medium text-emerald-600" href="/shop">مشاهده همه</a>
      </div>
      <div class="mt-4 grid gap-4 md:grid-cols-3">
        ${categories
          .map(
            (cat) => `
          <div class="rounded-2xl border border-slate-200 bg-white p-5">
            <p class="text-sm text-slate-500">${cat}</p>
            <p class="mt-2 text-lg font-semibold">${cat}</p>
            <p class="mt-2 text-sm text-slate-500">با محصولات برگزیده و فروشندگان تایید شده</p>
          </div>`
          )
          .join('')}
      </div>
    </section>

    <section class="mt-14">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold">منتخب‌های این هفته</h2>
        <a class="text-sm font-medium text-emerald-600" href="/shop">مشاهده فروشگاه</a>
      </div>
      <div class="mt-4 grid gap-4 md:grid-cols-3">
        ${featuredProducts
          .map(
            (product) => `
          <article class="rounded-2xl border border-slate-200 bg-white p-5">
            <div class="flex items-center justify-between">
              <span class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                ${product.badge}
              </span>
              <span class="text-xs text-slate-500">${product.category}</span>
            </div>
            <h3 class="mt-3 text-lg font-semibold">${product.title}</h3>
            <p class="mt-2 text-sm text-slate-500">فروشنده: ${product.seller} · ${product.city}</p>
            <div class="mt-4 flex items-center justify-between">
              <span class="text-lg font-bold text-slate-900">${product.price} تومان</span>
              <button class="rounded-full border border-slate-300 px-3 py-2 text-xs">افزودن</button>
            </div>
          </article>`
          )
          .join('')}
      </div>
    </section>

    <section class="mt-16 grid gap-6 md:grid-cols-2">
      <div class="rounded-3xl border border-slate-200 bg-white p-6">
        <h3 class="text-lg font-semibold">مشاوره هوشمند محصول</h3>
        <p class="mt-2 text-sm text-slate-500">
          نیاز خود را بنویسید تا مشاور هوشمند محصولات مناسب را پیشنهاد دهد.
        </p>
        <form id="ai-advisor-form" class="mt-4 space-y-3">
          <textarea
            id="ai-advisor-input"
            class="min-h-[110px] w-full rounded-2xl border border-slate-200 p-3 text-sm focus:border-emerald-500"
            placeholder="مثلاً: به دنبال هدیه دست‌ساز برای مادر با بودجه ۵۰۰ هزار تومان هستم"
          ></textarea>
          <button class="w-full rounded-full bg-emerald-600 py-3 text-sm font-semibold text-white">
            دریافت پیشنهاد
          </button>
          <div id="ai-advisor-result" class="text-sm text-slate-600"></div>
        </form>
      </div>
      <div class="rounded-3xl border border-slate-200 bg-white p-6">
        <h3 class="text-lg font-semibold">داستان توان‌یابان</h3>
        <p class="mt-2 text-sm text-slate-500">
          روایت فروشندگان را بخوانید و با خرید آگاهانه، از اقتصاد اثرگذار حمایت کنید.
        </p>
        <div class="mt-4 space-y-3">
          <div class="rounded-2xl bg-emerald-50 p-4">
            <p class="text-sm font-semibold">کارگاه حصیربافی امید</p>
            <p class="mt-1 text-xs text-slate-600">افزایش فروش ۳۵٪ پس از حضور در توان‌مارکت</p>
          </div>
          <div class="rounded-2xl bg-slate-100 p-4">
            <p class="text-sm font-semibold">تعاونی چرم دستان توانا</p>
            <p class="mt-1 text-xs text-slate-600">همکاری با ۲۳ فروشنده و صادرات آنلاین</p>
          </div>
        </div>
      </div>
    </section>
  `
}

const shopPage = () => {
  return `
    <section class="flex flex-col gap-6 md:flex-row">
      <aside class="w-full rounded-3xl border border-slate-200 bg-white p-5 md:w-1/3">
        <h2 class="text-lg font-semibold">فیلترهای پیشرفته</h2>
        <div class="mt-4 space-y-4 text-sm text-slate-600">
          <div>
            <label class="text-xs text-slate-500">جستجو</label>
            <input
              id="search-input"
              class="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2"
              placeholder="نام محصول یا فروشنده"
            />
          </div>
          <div>
            <label class="text-xs text-slate-500">دسته‌بندی</label>
            <select class="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2">
              <option>همه</option>
              ${categories.map((cat) => `<option>${cat}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="text-xs text-slate-500">محدوده قیمت</label>
            <div class="mt-1 flex gap-2">
              <input class="w-1/2 rounded-2xl border border-slate-200 px-3 py-2" placeholder="از" />
              <input class="w-1/2 rounded-2xl border border-slate-200 px-3 py-2" placeholder="تا" />
            </div>
          </div>
          <div class="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50 p-3 text-xs">
            امکان فیلتر هوشمند با هوش مصنوعی در فاز بعدی فعال می‌شود.
          </div>
        </div>
      </aside>
      <div class="w-full space-y-4">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold">فروشگاه محصولات</h1>
          <button class="rounded-full border border-slate-300 px-4 py-2 text-sm">لیست علاقه‌مندی</button>
        </div>
        <div class="grid gap-4 md:grid-cols-2" id="product-list">
          ${featuredProducts
            .map(
              (product) => `
            <article class="rounded-2xl border border-slate-200 bg-white p-5" data-title="${product.title}">
              <div class="flex items-center justify-between">
                <span class="rounded-full bg-slate-100 px-3 py-1 text-xs">${product.category}</span>
                <button class="text-xs text-emerald-600">❤ افزودن به علاقه‌مندی</button>
              </div>
              <h2 class="mt-3 text-lg font-semibold">${product.title}</h2>
              <p class="mt-2 text-sm text-slate-500">فروشنده: ${product.seller}</p>
              <div class="mt-4 flex items-center justify-between">
                <span class="text-lg font-bold">${product.price} تومان</span>
                <button class="rounded-full bg-emerald-600 px-4 py-2 text-xs text-white">سفارش</button>
              </div>
            </article>`
            )
            .join('')}
        </div>
      </div>
    </section>
  `
}

const blogPage = () => {
  return `
    <section>
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold">وبلاگ رشد سئو</h1>
        <span class="text-sm text-slate-500">آموزش و داستان‌های الهام‌بخش</span>
      </div>
      <div class="mt-6 grid gap-4 md:grid-cols-3">
        ${blogPosts
          .map(
            (post) => `
          <article class="rounded-2xl border border-slate-200 bg-white p-5">
            <p class="text-xs text-emerald-600">راهنمای سئو</p>
            <h2 class="mt-2 text-lg font-semibold">${post.title}</h2>
            <p class="mt-2 text-sm text-slate-500">${post.excerpt}</p>
            <a class="mt-4 inline-flex text-sm font-medium text-emerald-600" href="/blog/${post.slug}">
              ادامه مطلب
            </a>
          </article>`
          )
          .join('')}
      </div>
    </section>
  `
}

const sellerPage = () => {
  return `
    <section class="grid gap-6 md:grid-cols-3">
      <div class="rounded-3xl border border-slate-200 bg-white p-5 md:col-span-2">
        <h1 class="text-2xl font-bold">پنل فروشنده</h1>
        <p class="mt-2 text-sm text-slate-500">
          مدیریت محصولات، سفارش‌ها و دسته‌بندی هوشمند با ابزارهای هوش مصنوعی.
        </p>
        <div class="mt-6 grid gap-4 md:grid-cols-2">
          <div class="rounded-2xl bg-slate-50 p-4">
            <p class="text-xs text-slate-500">فروش این ماه</p>
            <p class="mt-2 text-lg font-semibold">۱۲٬۴۰۰٬۰۰۰ تومان</p>
          </div>
          <div class="rounded-2xl bg-slate-50 p-4">
            <p class="text-xs text-slate-500">سفارش‌های باز</p>
            <p class="mt-2 text-lg font-semibold">۷ سفارش</p>
          </div>
        </div>
        <form id="ai-categorize-form" class="mt-6 space-y-3">
          <h2 class="text-lg font-semibold">ثبت محصول جدید</h2>
          <input
            id="product-title"
            class="w-full rounded-2xl border border-slate-200 px-3 py-2"
            placeholder="نام محصول"
          />
          <textarea
            id="product-desc"
            class="min-h-[110px] w-full rounded-2xl border border-slate-200 px-3 py-2"
            placeholder="توضیح کوتاه محصول"
          ></textarea>
          <button
            id="ai-categorize-btn"
            class="w-full rounded-full bg-emerald-600 py-3 text-sm font-semibold text-white"
          >
            پیشنهاد دسته‌بندی هوشمند
          </button>
          <div id="ai-categorize-result" class="text-sm text-slate-600"></div>
        </form>
      </div>
      <aside class="rounded-3xl border border-slate-200 bg-white p-5">
        <h3 class="text-lg font-semibold">راهنمای فروشندگان</h3>
        <ul class="mt-3 space-y-2 text-sm text-slate-500">
          <li>تکمیل پروفایل فروشگاه برای افزایش اعتماد</li>
          <li>استفاده از کلیدواژه‌های سئو در عنوان محصول</li>
          <li>بارگذاری تصاویر باکیفیت</li>
          <li>تعریف تخفیف‌های دوره‌ای</li>
        </ul>
      </aside>
    </section>
  `
}

const adminPage = () => {
  return `
    <section class="grid gap-6 md:grid-cols-3">
      <div class="rounded-3xl border border-slate-200 bg-white p-6 md:col-span-2">
        <h1 class="text-2xl font-bold">پنل مدیریت</h1>
        <p class="mt-2 text-sm text-slate-500">مدیریت نقش‌ها، پرداخت‌ها و اینسایت‌های سایت.</p>
        <div class="mt-6 grid gap-4 md:grid-cols-2">
          <div class="rounded-2xl bg-slate-50 p-4">
            <p class="text-xs text-slate-500">درآمد کل</p>
            <p class="mt-2 text-lg font-semibold">۴۸٬۵۰۰٬۰۰۰ تومان</p>
          </div>
          <div class="rounded-2xl bg-slate-50 p-4">
            <p class="text-xs text-slate-500">بازدید امروز</p>
            <p class="mt-2 text-lg font-semibold">۶٬۸۲۰</p>
          </div>
        </div>
        <div class="mt-6">
          <h2 class="text-lg font-semibold">نقش‌های پیشنهادی</h2>
          <div class="mt-3 grid gap-3 md:grid-cols-2">
            ${roles
              .map(
                (role) => `
              <div class="rounded-2xl border border-slate-200 p-4">
                <p class="text-sm font-semibold">${role.title}</p>
                <p class="mt-1 text-xs text-slate-500">${role.desc}</p>
              </div>`
              )
              .join('')}
          </div>
        </div>
      </div>
      <aside class="rounded-3xl border border-slate-200 bg-white p-6">
        <h3 class="text-lg font-semibold">تنظیمات سریع</h3>
        <div class="mt-4 space-y-3 text-sm text-slate-600">
          <div>
            <label class="text-xs text-slate-500">درگاه پرداخت پیش‌فرض</label>
            <select class="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2">
              <option>زرین‌پال</option>
              <option>نکست‌پی</option>
              <option>IDPay</option>
            </select>
          </div>
          <div>
            <label class="text-xs text-slate-500">وضعیت بلاگ</label>
            <select class="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2">
              <option>فعال</option>
              <option>غیرفعال</option>
            </select>
          </div>
          <div class="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50 p-3 text-xs">
            مدیریت درگاه‌ها و تنظیمات امنیتی در نسخه کامل فعال می‌شود.
          </div>
        </div>
      </aside>
    </section>
  `
}

const authPage = () => {
  return `
    <section class="grid gap-6 md:grid-cols-2">
      <div class="rounded-3xl border border-slate-200 bg-white p-6">
        <h1 class="text-2xl font-bold">ورود به توان‌مارکت</h1>
        <p class="mt-2 text-sm text-slate-500">برای دسترسی به پنل‌ها وارد شوید.</p>
        <form id="auth-login-form" class="mt-6 space-y-3">
          <input
            id="auth-login-email"
            class="w-full rounded-2xl border border-slate-200 px-3 py-2"
            placeholder="ایمیل"
            type="email"
            required
          />
          <input
            id="auth-login-password"
            class="w-full rounded-2xl border border-slate-200 px-3 py-2"
            placeholder="رمز عبور"
            type="password"
            required
          />
          <button class="w-full rounded-full bg-emerald-600 py-3 text-sm font-semibold text-white">
            ورود
          </button>
          <div id="auth-login-result" class="text-sm text-slate-600"></div>
        </form>
      </div>
      <div class="rounded-3xl border border-slate-200 bg-white p-6">
        <h2 class="text-2xl font-bold">ثبت‌نام</h2>
        <p class="mt-2 text-sm text-slate-500">حساب جدید ایجاد کنید و فروش خود را شروع کنید.</p>
        <form id="auth-register-form" class="mt-6 space-y-3">
          <input
            id="auth-register-name"
            class="w-full rounded-2xl border border-slate-200 px-3 py-2"
            placeholder="نام و نام خانوادگی"
            required
          />
          <input
            id="auth-register-email"
            class="w-full rounded-2xl border border-slate-200 px-3 py-2"
            placeholder="ایمیل"
            type="email"
            required
          />
          <input
            id="auth-register-password"
            class="w-full rounded-2xl border border-slate-200 px-3 py-2"
            placeholder="رمز عبور"
            type="password"
            required
          />
          <button class="w-full rounded-full border border-emerald-600 py-3 text-sm font-semibold text-emerald-700">
            ثبت‌نام
          </button>
          <div id="auth-register-result" class="text-sm text-slate-600"></div>
        </form>
      </div>
      <div class="rounded-3xl border border-slate-200 bg-white p-6 md:col-span-2">
        <h3 class="text-lg font-semibold">وضعیت حساب</h3>
        <div class="mt-3 flex flex-wrap items-center gap-3">
          <span id="auth-status" class="rounded-full bg-slate-100 px-3 py-1 text-xs">در حال بررسی...</span>
          <button
            id="auth-me-btn"
            class="rounded-full border border-slate-300 px-4 py-2 text-xs text-slate-700"
            type="button"
          >
            مشاهده پروفایل
          </button>
          <button
            id="auth-logout-btn"
            class="rounded-full border border-rose-300 px-4 py-2 text-xs text-rose-600"
            type="button"
          >
            خروج
          </button>
        </div>
        <div id="auth-me-result" class="mt-3 text-sm text-slate-600"></div>
      </div>
    </section>
  `
}

const blogPostPage = (slug: string) => {
  const post = blogPosts.find((item) => item.slug === slug)
  if (!post) {
    return `
      <section class="rounded-3xl border border-slate-200 bg-white p-6">
        <h1 class="text-2xl font-bold">مقاله پیدا نشد</h1>
        <p class="mt-2 text-sm text-slate-500">لطفاً به صفحه وبلاگ برگردید.</p>
      </section>
    `
  }
  return `
    <article class="rounded-3xl border border-slate-200 bg-white p-6">
      <p class="text-xs text-emerald-600">وبلاگ توان‌مارکت</p>
      <h1 class="mt-2 text-2xl font-bold">${post.title}</h1>
      <p class="mt-4 text-sm text-slate-600">${post.excerpt}</p>
      <div class="mt-6 space-y-3 text-sm text-slate-500">
        <p>در نسخه کامل، این صفحه با محتوای آموزشی، تصاویر و فراخوان اقدام تکمیل خواهد شد.</p>
        <p>از این مقاله برای لینک‌سازی داخلی صفحات محصول و بهبود رتبه سئو استفاده می‌کنیم.</p>
      </div>
    </article>
  `
}

const sitemapXml = () => {
  const urls = ['/', '/shop', '/blog', '/seller', '/admin', '/auth']
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (path) => `
  <url>
    <loc>${site.url}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('')}
</urlset>`
}

const fallbackCategorize = (title: string, description: string) => {
  const text = `${title} ${description}`
  const match = [
    { key: 'خوراک', category: 'خوراکی سالم' },
    { key: 'حصیر', category: 'صنایع دستی' },
    { key: 'چرم', category: 'صنایع دستی' },
    { key: 'روسری', category: 'پوشاک و اکسسوری' },
    { key: 'آموزش', category: 'آموزش و مشاوره' },
    { key: 'مشاوره', category: 'آموزش و مشاوره' }
  ]
  const found = match.find((item) => text.includes(item.key))
  return {
    categories: found ? [found.category] : ['محصولات عمومی'],
    tags: ['توان‌یابان', 'دست‌ساز', 'محلی']
  }
}

const fallbackAdvice = (query: string) => {
  return {
    answer:
      'با توجه به نیاز شما، پیشنهاد می‌کنیم محصولات صنایع دستی با بسته‌بندی هدیه و خدمات شخصی‌سازی را بررسی کنید. در صورت تمایل می‌توانید فیلتر بودجه را تنظیم کنید.',
    suggestedProducts: featuredProducts.map((product) => product.title),
    query
  }
}

const generateWithHf = async (token: string, model: string, prompt: string) => {
  const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        max_new_tokens: 200,
        return_full_text: false
      }
    })
  })

  if (!response.ok) {
    return null
  }

  const data = (await response.json()) as Array<{ generated_text?: string }>
  return data?.[0]?.generated_text?.trim() ?? null
}

const toBase64 = (bytes: Uint8Array) => {
  let binary = ''
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary)
}

const toBase64Url = (bytes: Uint8Array) => {
  return toBase64(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

const fromBase64 = (base64: string) => {
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

const hashPassword = async (password: string, salt?: Uint8Array) => {
  const encoder = new TextEncoder()
  const saltBytes = salt ?? crypto.getRandomValues(new Uint8Array(16))
  const keyMaterial = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, [
    'deriveBits'
  ])
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      hash: 'SHA-256',
      salt: saltBytes,
      iterations: 100000
    },
    keyMaterial,
    256
  )
  return {
    salt: toBase64(saltBytes),
    hash: toBase64(new Uint8Array(derivedBits))
  }
}

const verifyPassword = async (password: string, salt: string, hash: string) => {
  const derived = await hashPassword(password, fromBase64(salt))
  return derived.hash === hash
}

const signJwt = async (payload: Record<string, unknown>, secret: string) => {
  const encoder = new TextEncoder()
  const header = toBase64Url(encoder.encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' })))
  const body = toBase64Url(encoder.encode(JSON.stringify(payload)))
  const unsigned = `${header}.${body}`
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(unsigned))
  return `${unsigned}.${toBase64Url(new Uint8Array(signature))}`
}

const verifyJwt = async (token: string, secret: string) => {
  const encoder = new TextEncoder()
  const [header, payload, signature] = token.split('.')
  if (!header || !payload || !signature) {
    return null
  }
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  )
  const valid = await crypto.subtle.verify(
    'HMAC',
    key,
    fromBase64(signature.replace(/-/g, '+').replace(/_/g, '/')),
    encoder.encode(`${header}.${payload}`)
  )
  if (!valid) return null
  const decoded = JSON.parse(new TextDecoder().decode(fromBase64(payload.replace(/-/g, '+').replace(/_/g, '/'))))
  return decoded
}

app.get('/', (c) => {
  return c.html(
    baseLayout({
      title: `${site.name} | فروشگاه محصولات توان‌یابان`,
      description: site.description,
      content: homePage()
    })
  )
})

app.get('/shop', (c) => {
  return c.html(
    baseLayout({
      title: `${site.name} | فروشگاه`,
      description: 'خرید محصولات و خدمات توان‌یابان با فیلترهای پیشرفته و دسته‌بندی هوشمند.',
      content: shopPage()
    })
  )
})

app.get('/blog', (c) => {
  return c.html(
    baseLayout({
      title: `${site.name} | وبلاگ سئو`,
      description: 'راهنمای رشد سئو، داستان فروشندگان و نکات بازاریابی اجتماعی.',
      content: blogPage()
    })
  )
})

app.get('/blog/:slug', (c) => {
  return c.html(
    baseLayout({
      title: `${site.name} | مقاله`,
      description: 'مقاله آموزشی توان‌مارکت',
      content: blogPostPage(c.req.param('slug'))
    })
  )
})

app.get('/seller', (c) => {
  return c.html(
    baseLayout({
      title: `${site.name} | پنل فروشنده`,
      description: 'مدیریت محصولات و سفارش‌ها برای فروشندگان توان‌مارکت.',
      content: sellerPage()
    })
  )
})

app.get('/admin', (c) => {
  return c.html(
    baseLayout({
      title: `${site.name} | پنل مدیریت`,
      description: 'مدیریت نقش‌ها، پرداخت‌ها و اینسایت‌های سایت.',
      content: adminPage()
    })
  )
})

app.get('/auth', (c) => {
  return c.html(
    baseLayout({
      title: `${site.name} | ورود و ثبت‌نام`,
      description: 'ورود و ثبت‌نام کاربران توان‌مارکت',
      content: authPage()
    })
  )
})

app.get('/robots.txt', (c) => {
  return c.text('User-agent: *\nAllow: /\nSitemap: /sitemap.xml', 200, {
    'Content-Type': 'text/plain; charset=utf-8'
  })
})

app.get('/sitemap.xml', (c) => {
  return c.text(sitemapXml(), 200, {
    'Content-Type': 'application/xml; charset=utf-8'
  })
})

app.get('/api/products', async (c) => {
  const query = c.req.query('q')?.toLowerCase() ?? ''
  try {
    const { results } = await c.env.DB.prepare(
      `SELECT id, title, price, seller_name as seller, city, category, badge
       FROM products
       WHERE lower(title) LIKE ?
       ORDER BY created_at DESC
       LIMIT 12`
    )
      .bind(`%${query}%`)
      .all()

    return c.json({ items: results })
  } catch {
    const results = featuredProducts.filter((product) =>
      product.title.toLowerCase().includes(query)
    )
    return c.json({ items: results, fallback: true })
  }
})

app.post('/api/ai/categorize', async (c) => {
  const { title, description } = await c.req.json<{
    title?: string
    description?: string
  }>()

  const safeTitle = title?.trim() ?? ''
  const safeDescription = description?.trim() ?? ''

  if (!safeTitle && !safeDescription) {
    return c.json({ error: 'اطلاعات محصول ارسال نشده است.' }, 400)
  }

  const token = c.env.HF_API_TOKEN
  const model = c.env.HF_MODEL ?? 'Qwen/Qwen2.5-7B-Instruct'

  if (!token) {
    return c.json({ ...fallbackCategorize(safeTitle, safeDescription), provider: 'fallback' })
  }

  const prompt = `شما یک دستیار دسته‌بندی محصولات فروشگاهی هستید. سه دسته پیشنهادی و سه برچسب فارسی بر اساس متن زیر ارائه کن.\nعنوان: ${safeTitle}\nتوضیح: ${safeDescription}`
  const output = await generateWithHf(token, model, prompt)

  if (!output) {
    return c.json({ ...fallbackCategorize(safeTitle, safeDescription), provider: 'fallback' })
  }

  return c.json({ raw: output, provider: 'huggingface' })
})

app.post('/api/ai/advice', async (c) => {
  const { query } = await c.req.json<{ query?: string }>()
  const safeQuery = query?.trim()

  if (!safeQuery) {
    return c.json({ error: 'متن مشاوره ارسال نشده است.' }, 400)
  }

  const token = c.env.HF_API_TOKEN
  const model = c.env.HF_MODEL ?? 'Qwen/Qwen2.5-7B-Instruct'

  if (!token) {
    return c.json({ ...fallbackAdvice(safeQuery), provider: 'fallback' })
  }

  const prompt = `شما مشاور خرید فروشگاه توان‌مارکت هستید. پاسخ کوتاه فارسی بده و حداکثر سه پیشنهاد محصول ارائه کن. سوال: ${safeQuery}`
  const output = await generateWithHf(token, model, prompt)

  if (!output) {
    return c.json({ ...fallbackAdvice(safeQuery), provider: 'fallback' })
  }

  return c.json({ answer: output, provider: 'huggingface' })
})

app.post('/api/auth/register', async (c) => {
  const { name, email, password } = await c.req.json<{
    name?: string
    email?: string
    password?: string
  }>()

  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    return c.json({ error: 'نام، ایمیل و رمز عبور الزامی است.' }, 400)
  }

  try {
    const existing = await c.env.DB.prepare('SELECT id FROM users WHERE email = ?')
      .bind(email)
      .first()
    if (existing) {
      return c.json({ error: 'این ایمیل قبلاً ثبت شده است.' }, 409)
    }

    const hashed = await hashPassword(password)
    const result = await c.env.DB.prepare(
      `INSERT INTO users (name, email, password_hash, password_salt, role)
       VALUES (?, ?, ?, ?, 'buyer')`
    )
      .bind(name, email, hashed.hash, hashed.salt)
      .run()

    return c.json({
      id: result.meta.last_row_id,
      name,
      email,
      role: 'buyer'
    })
  } catch (error) {
    return c.json({ error: 'خطا در ثبت نام.' }, 500)
  }
})

app.post('/api/auth/login', async (c) => {
  const { email, password } = await c.req.json<{
    email?: string
    password?: string
  }>()

  if (!email?.trim() || !password?.trim()) {
    return c.json({ error: 'ایمیل و رمز عبور الزامی است.' }, 400)
  }

  const user = await c.env.DB.prepare(
    'SELECT id, name, email, password_hash, password_salt, role FROM users WHERE email = ?'
  )
    .bind(email)
    .first()

  if (!user) {
    return c.json({ error: 'اطلاعات ورود نادرست است.' }, 401)
  }

  const valid = await verifyPassword(password, user.password_salt as string, user.password_hash as string)
  if (!valid) {
    return c.json({ error: 'اطلاعات ورود نادرست است.' }, 401)
  }

  const secret = c.env.AUTH_SECRET
  if (!secret) {
    return c.json({ error: 'کلید امنیتی احراز هویت تنظیم نشده است.' }, 500)
  }

  const token = await signJwt(
    {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
    },
    secret
  )

  return c.json({ token })
})

app.get('/api/auth/me', async (c) => {
  const auth = c.req.header('Authorization')
  if (!auth?.startsWith('Bearer ')) {
    return c.json({ error: 'توکن ارسال نشده است.' }, 401)
  }

  const secret = c.env.AUTH_SECRET
  if (!secret) {
    return c.json({ error: 'کلید امنیتی احراز هویت تنظیم نشده است.' }, 500)
  }

  const payload = await verifyJwt(auth.replace('Bearer ', ''), secret)
  if (!payload) {
    return c.json({ error: 'توکن معتبر نیست.' }, 401)
  }

  return c.json({ user: payload })
})

app.get('/api/insights', (c) => {
  return c.json({
    revenue: 48500000,
    visitsToday: 6820,
    activeSellers: 240
  })
})

app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

export default app

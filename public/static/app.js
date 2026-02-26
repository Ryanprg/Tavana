const advisorForm = document.getElementById('ai-advisor-form')
const advisorInput = document.getElementById('ai-advisor-input')
const advisorResult = document.getElementById('ai-advisor-result')

const categorizeForm = document.getElementById('ai-categorize-form')
const productTitle = document.getElementById('product-title')
const productDesc = document.getElementById('product-desc')
const categorizeResult = document.getElementById('ai-categorize-result')

const searchInput = document.getElementById('search-input')
const productList = document.getElementById('product-list')

const registerForm = document.getElementById('auth-register-form')
const registerName = document.getElementById('auth-register-name')
const registerEmail = document.getElementById('auth-register-email')
const registerPassword = document.getElementById('auth-register-password')
const registerResult = document.getElementById('auth-register-result')

const loginForm = document.getElementById('auth-login-form')
const loginEmail = document.getElementById('auth-login-email')
const loginPassword = document.getElementById('auth-login-password')
const loginResult = document.getElementById('auth-login-result')

const authStatus = document.getElementById('auth-status')
const authMeBtn = document.getElementById('auth-me-btn')
const authMeResult = document.getElementById('auth-me-result')
const authLogoutBtn = document.getElementById('auth-logout-btn')

const AUTH_TOKEN_KEY = 'a5b28747-5cfa-4231-9f6f-cf65f92ad4cf'

const renderResult = (target, html) => {
  if (!target) return
  target.innerHTML = html
}

const updateAuthStatus = () => {
  if (!authStatus) return
  const token = localStorage.getItem(AUTH_TOKEN_KEY)
  authStatus.textContent = token ? 'ورود انجام شده' : 'وارد نشده'
}

if (advisorForm) {
  advisorForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const query = advisorInput?.value?.trim()
    if (!query) {
      renderResult(advisorResult, 'لطفاً نیاز خود را وارد کنید.')
      return
    }

    renderResult(advisorResult, 'در حال پردازش پیشنهادها...')

    try {
      const response = await fetch('/api/ai/advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      })
      const data = await response.json()
      if (data.error) {
        renderResult(advisorResult, data.error)
        return
      }
      const suggestions = data.suggestedProducts
        ? `<div class="mt-2 text-xs text-emerald-700">پیشنهادها: ${data.suggestedProducts.join(
            '، '
          )}</div>`
        : ''
      renderResult(
        advisorResult,
        `<div class="rounded-2xl bg-emerald-50 p-3 text-sm">${data.answer}</div>${suggestions}`
      )
    } catch (error) {
      renderResult(advisorResult, 'خطا در ارتباط با سرویس هوش مصنوعی.')
    }
  })
}

if (categorizeForm) {
  categorizeForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const title = productTitle?.value?.trim()
    const description = productDesc?.value?.trim()

    if (!title && !description) {
      renderResult(categorizeResult, 'نام یا توضیح محصول را وارد کنید.')
      return
    }

    renderResult(categorizeResult, 'در حال تحلیل محصول...')

    try {
      const response = await fetch('/api/ai/categorize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
      })
      const data = await response.json()
      if (data.error) {
        renderResult(categorizeResult, data.error)
        return
      }
      if (data.raw) {
        renderResult(categorizeResult, `<pre class="whitespace-pre-wrap text-xs">${data.raw}</pre>`)
        return
      }
      renderResult(
        categorizeResult,
        `<div class="rounded-2xl bg-slate-50 p-3 text-xs">دسته‌ها: ${data.categories.join(
          '، '
        )}<br/>برچسب‌ها: ${data.tags.join('، ')}</div>`
      )
    } catch (error) {
      renderResult(categorizeResult, 'خطا در تحلیل هوشمند.')
    }
  })
}

if (searchInput && productList) {
  searchInput.addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase()
    const cards = productList.querySelectorAll('[data-title]')
    cards.forEach((card) => {
      const title = card.getAttribute('data-title')?.toLowerCase() ?? ''
      card.style.display = title.includes(query) ? 'block' : 'none'
    })
  })
}

if (registerForm) {
  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const name = registerName?.value?.trim()
    const email = registerEmail?.value?.trim()
    const password = registerPassword?.value?.trim()

    if (!name || !email || !password) {
      renderResult(registerResult, 'تمام فیلدها الزامی است.')
      return
    }

    renderResult(registerResult, 'در حال ثبت‌نام...')
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      const data = await response.json()
      if (data.error) {
        renderResult(registerResult, data.error)
        return
      }
      renderResult(registerResult, 'ثبت‌نام موفق بود. اکنون وارد شوید.')
      registerForm.reset()
    } catch (error) {
      renderResult(registerResult, 'خطا در ثبت‌نام.')
    }
  })
}

if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const email = loginEmail?.value?.trim()
    const password = loginPassword?.value?.trim()

    if (!email || !password) {
      renderResult(loginResult, 'ایمیل و رمز عبور الزامی است.')
      return
    }

    renderResult(loginResult, 'در حال ورود...')
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      if (data.error) {
        renderResult(loginResult, data.error)
        return
      }
      localStorage.setItem(AUTH_TOKEN_KEY, data.token)
      updateAuthStatus()
      renderResult(loginResult, 'ورود موفق بود.')
      loginForm.reset()
    } catch (error) {
      renderResult(loginResult, 'خطا در ورود.')
    }
  })
}

if (authMeBtn) {
  authMeBtn.addEventListener('click', async () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (!token) {
      renderResult(authMeResult, 'ابتدا وارد شوید.')
      return
    }

    renderResult(authMeResult, 'در حال دریافت اطلاعات...')
    try {
      const response = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await response.json()
      if (data.error) {
        renderResult(authMeResult, data.error)
        return
      }
      renderResult(
        authMeResult,
        `کاربر: ${data.user.name} (${data.user.email}) · نقش: ${data.user.role}`
      )
    } catch (error) {
      renderResult(authMeResult, 'خطا در دریافت اطلاعات.')
    }
  })
}

if (authLogoutBtn) {
  authLogoutBtn.addEventListener('click', () => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    updateAuthStatus()
    renderResult(authMeResult, 'از حساب خارج شدید.')
  })
}

updateAuthStatus()

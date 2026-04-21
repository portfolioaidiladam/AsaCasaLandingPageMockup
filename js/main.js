const checkin = document.getElementById('checkin');
const checkout = document.getElementById('checkout');
const calcRows = document.querySelectorAll('.calc-row');
const amount = document.querySelector('.amount');

const RATE = 330000;
const CLEAN = 150000;

function t(key) {
    const lang = (window.i18n && window.i18n.getLang()) || 'en';
    const dict = (window.translations && window.translations[lang]) || {};
    return dict[key] || key;
}

function updatePrice() {
    const ci = new Date(checkin.value);
    const co = new Date(checkout.value);
    const nights = Math.max(1, Math.round((co - ci) / (1000 * 60 * 60 * 24)));

    let discount = 0, pct = 0;
    if (nights >= 30) { discount = 0.15; pct = 15; }
    else if (nights >= 7) { discount = 0.13; pct = 13; }

    const subtotal = RATE * nights;
    const discountAmount = subtotal * discount;
    const total = subtotal - discountAmount + CLEAN;

    const discountLabel = discount > 0 ? ` (${t('calc.discount')} ${pct}%)` : '';
    const rateStr = RATE.toLocaleString('id-ID');
    const lineStr = (subtotal - discountAmount).toLocaleString('id-ID');
    const cleanStr = CLEAN.toLocaleString('id-ID');

    calcRows[0].innerHTML = `<span>Rp ${rateStr} × ${nights} ${t('calc.nights')}${discountLabel}</span><span>Rp ${lineStr}</span>`;
    calcRows[1].innerHTML = `<span>${t('calc.cleaning')}</span><span>Rp ${cleanStr}</span>`;
    amount.textContent = 'Rp ' + total.toLocaleString('id-ID');
}

checkin.addEventListener('change', updatePrice);
checkout.addEventListener('change', updatePrice);
window.addEventListener('langchange', updatePrice);

updatePrice();

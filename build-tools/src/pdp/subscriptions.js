import { util } from '../util';
import './subscriptions.css';

export default function subscriptions() {
  // We need to wait until widget is ready
  util.waitForElement('#shopify-block-subscriptions_app_block_McRKA7').then((widget) => {
    customizeWidget(widget);
  });
}

const customizeWidget = (elm) => {
  const subscribeMessage = document.getElementById('main-product')?.getAttribute('data-subscribe-message') || null;
  const onetimeMessage = document.getElementById('main-product').getAttribute('data-onetime-message') || null;
  const howItWorksMessage = document.getElementById('main-product').getAttribute('data-how-it-works') || null;
  const defaultOption = document.getElementById('main-product').getAttribute('data-default-option') || 'subscribe';

  let radioDotCount = 0; // Keep track of created radio dots
  function createRadioButtonDot() {
    const radioButtonDot = `
    <div id="radio-dot-${radioDotCount}" class="tw-relative tw-w-5 tw-h-5 tw-min-w-[1rem]">
      <svg class="tw-absolute tw-top-1/2 tw-left-1/2 tw-transform tw--translate-x-1/2 tw--translate-y-1/2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="9.5" stroke="black"/>
      </svg>
      <svg class="tw-hidden tw-absolute tw-top-1/2 tw-left-1/2 tw-transform tw--translate-x-1/2 tw--translate-y-1/2" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="7" cy="7" r="6.5" fill="#DD3E6B" stroke="black"/>
      </svg>
    </div>
    `;
    radioDotCount++; // Increment counter for unique IDs
    return radioButtonDot;
  }

  const subsavePrice = elm.querySelector(
    '.shopify_subscriptions_app_block_label > .shopify_subscriptions_purchase_option_wrapper div'
  );
  if (subsavePrice) {
    subsavePrice.textContent = subsavePrice.textContent.replace(' USD', '');
  }
  const onetimePrice = elm
    .querySelector('.shopify_subscriptions_purchase_option_wrapper label input')
    ?.getAttribute('data-variant-price')
    ?.replace(' USD', '');

  const subsaveDefaultLabel = elm.querySelector(
    '.shopify_subscriptions_app_block_label > .shopify_subscriptions_purchase_option_wrapper label'
  );

  const subsaveLabelArea = elm.querySelector('.shopify_subscriptions_app_block_label_children label');
  if (subsaveLabelArea) {
    subsaveLabelArea.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        subsaveLabelArea.removeChild(node);
      }
    });

    //Add dots to the widget
    subsaveLabelArea.insertAdjacentHTML('afterbegin', createRadioButtonDot());

    const priceLabel = document.createElement('span');
    priceLabel.classList.add('subsave-price-label', 'tw-pl-6', 'tw-text-lg', 'tw-font-semibold');
    priceLabel.textContent = subsavePrice.textContent;
    subsaveLabelArea.appendChild(priceLabel);

    const ctaLabel = document.createElement('span');
    ctaLabel.classList.add('subsave-cta-label', 'tw-pl-5', 'tw-text-sm', 'tw-font-semibold');
    ctaLabel.textContent = subscribeMessage || subsaveDefaultLabel?.textContent || 'Subscribe & Save';

    subsaveLabelArea.appendChild(ctaLabel);
  }

  const onetimeLabelArea = elm.querySelector('.shopify_subscriptions_purchase_option_wrapper label');
  if (onetimeLabelArea) {
    const defaultOnetimeMessage = onetimeLabelArea.textContent;
    onetimeLabelArea.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        onetimeLabelArea.removeChild(node);
      }
    });

    //Add dots to the widget
    onetimeLabelArea.insertAdjacentHTML('afterbegin', createRadioButtonDot());

    const priceLabel = document.createElement('span');
    priceLabel.classList.add('onetime-price-label', 'tw-pl-6', 'tw-text-lg', 'tw-font-semibold');
    priceLabel.textContent = onetimePrice;
    onetimeLabelArea.appendChild(priceLabel);

    const ctaLabel = document.createElement('span');
    ctaLabel.classList.add('onetime-cta-label', 'tw-pl-5', 'tw-text-sm', 'tw-font-semibold');
    ctaLabel.textContent = onetimeMessage || defaultOnetimeMessage;
    onetimeLabelArea.appendChild(ctaLabel);
  }

  //Subscribe description container
  const subsaveDescriptionDiv = document.createElement('div');
  subsaveDescriptionDiv.classList.add('subsave-description');
  subsaveDescriptionDiv.textContent =
    howItWorksMessage ||
    'Products are automatically delivered on your schedule. No obligation, modify or cancel your subscription anytime';

  subsaveLabelArea.insertAdjacentElement('afterend', subsaveDescriptionDiv);

  //Onetime Quantity container
  const onetimeLabel = elm.querySelector('.shopify_subscriptions_in_widget_price');

  const quantityDiv = document.createElement('div');
  quantityDiv.id = 'one-time';
  quantityDiv.classList.add('tw-flex', 'tw-w-[133px]', 'tw-mt-[18px]', 'tw-h-10', 'tw-border-black', 'tw-border');

  const quantityButtonMinus = document.createElement('button');
  quantityButtonMinus.id = 'decrease-quantity';
  quantityButtonMinus.classList.add('tw-w-full');
  quantityButtonMinus.textContent = '-';

  const quantityInput = document.createElement('input');
  quantityInput.id = 'quantity-widget';
  quantityInput.type = 'text';
  quantityInput.name = 'quantity-widget';
  quantityInput.value = '1';
  quantityInput.min = '1';
  quantityInput.classList.add(
    'tw-w-full',
    'tw-border-black',
    'tw-border-l',
    'tw-border-r',
    'tw-text-center',
    'tw-text-xs',
    'tw-font-semibold'
  );

  const quantityButtonPlus = document.createElement('button');
  quantityButtonPlus.id = 'increase-quantity';
  quantityButtonPlus.classList.add('tw-w-full');
  quantityButtonPlus.textContent = '+';

  //Add quantity container to the widget
  quantityDiv.appendChild(quantityButtonMinus);
  quantityDiv.appendChild(quantityInput);
  quantityDiv.appendChild(quantityButtonPlus);

  onetimeLabel.insertAdjacentElement('afterend', quantityDiv);

  //Add event listener for handling amount increase and decrease
  const qty = document.getElementById('quantity-widget');

  qty.addEventListener('blur', () => {
    //Update form quantity selector
    document.querySelector('input[name="quantity"]').value = qty.value;
    //Update price shown on checkout button
    const onetimePrice = parseFloat(removeDollarSign(document.querySelector('.onetime-price-label').textContent));
    document.getElementById('product-price').textContent = '$' + (parseInt(qty.value) * onetimePrice).toFixed(2);
  });

  const decreaseButton = document.getElementById('decrease-quantity');
  const increaseButton = document.getElementById('increase-quantity');
  decreaseButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (qty.value > 1) {
      qty.value = parseInt(qty.value) - 1;
      //Update form quantity selector
      document.querySelector('input[name="quantity"]').value = qty.value;

      //Update price shown on checkout button
      const onetimePrice = parseFloat(removeDollarSign(document.querySelector('.onetime-price-label').textContent));
      document.getElementById('product-price').textContent = '$' + (parseInt(qty.value) * onetimePrice).toFixed(2);
    }
  });
  increaseButton.addEventListener('click', (event) => {
    event.preventDefault();
    //Update form quantity selector
    qty.value = parseInt(qty.value) + 1;
    document.querySelector('input[name="quantity"]').value = qty.value;

    //Update price shown on checkout button
    const onetimePrice = parseFloat(removeDollarSign(document.querySelector('.onetime-price-label').textContent));
    document.getElementById('product-price').textContent = '$' + (parseInt(qty.value) * onetimePrice).toFixed(2);
  });

  //Add listener to only accept numbers in the quantity text input
  qty.addEventListener('input', () => {
    const currentValue = qty.value.trim();
    const parsedValue = parseInt(currentValue);
    if (isNaN(parsedValue)) {
      // The value is not a valid number so restore the default value
      qty.value = 1;
      document.querySelector('input[name="quantity"]').value = 1;
    } else {
      qty.value = parsedValue;
      document.querySelector('input[name="quantity"]').value = qty.value;
    }
  });

  //Add a listener to update elements when the user switches selling plans by clicking radio buttons.
  function removeDollarSign(text) {
    return text.replace('$', '');
  }
  document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener('change', (e) => {
      const radioType = e.target.getAttribute('data-radio-type');
      if (radioType === 'selling_plan') {
        document.getElementById('one-time').classList.add('tw-hidden');
        document.getElementById('saving-copy').classList.remove('tw-hidden');
        document.querySelector('#radio-dot-0 svg:nth-child(2)').classList.remove('tw-hidden');
        document.querySelector('#radio-dot-1 svg:nth-child(2)').classList.add('tw-hidden');
        document.querySelector('.subsave-description').classList.remove('tw-hidden');
        document.querySelector('input[name="quantity"]').value = 1;
        document.getElementById('product-price').textContent =
          document.querySelector('.subsave-price-label').textContent;
      } else if (radioType === 'one_time_purchase') {
        const quantityWidget = parseInt(document.getElementById('quantity-widget').value);
        const onetimePrice = parseFloat(removeDollarSign(document.querySelector('.onetime-price-label').textContent));
        document.getElementById('one-time').classList.remove('tw-hidden');
        document.getElementById('saving-copy').classList.add('tw-hidden');
        document.querySelector('#radio-dot-0 svg:nth-child(2)').classList.add('tw-hidden');
        document.querySelector('#radio-dot-1 svg:nth-child(2)').classList.remove('tw-hidden');
        document.querySelector('.subsave-description').classList.add('tw-hidden');
        document.querySelector('input[name="quantity"]').value = quantityWidget;
        document.getElementById('product-price').textContent = '$' + (quantityWidget * onetimePrice).toFixed(2);
      }
    });
  });

  //Default option
  const radioSelected = {
    subscribe: 'selling_plan',
    onetime: 'one_time_purchase',
  };
  const myInput = document.querySelector(`input[type="radio"][data-radio-type="${radioSelected[defaultOption]}"]`);
  if (myInput) {
    myInput.dispatchEvent(new Event('change'));
    myInput.checked = true;
  }

  //Display the vertical pipe character in the checkout button
  document.getElementById('price-pipe').classList.remove('tw-hidden');
};

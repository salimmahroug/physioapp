// Page.js
import { Link } from 'react-router-dom';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PagesCss/Home.css';

function Home() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  window.addEventListener('scroll', function () {
    var features = document.querySelector('.features2');
    var rect = features?.getBoundingClientRect();
    var windowHeight = window.innerHeight;
    if (rect.top < windowHeight && rect.bottom >= 0) {
      features.classList.add('scrolled');
    } else {
      features.classList.remove('scrolled');
    }
  });
  window.addEventListener('scroll', function () {
    var features = document.querySelector('.features3');
    var rect = features?.getBoundingClientRect();
    var windowHeight = window.innerHeight;
    if (rect.top < windowHeight && rect.bottom >= 0) {
      features.classList.add('scrolled');
    } else {
      features.classList.remove('scrolled');
    }
  });

  window.addEventListener('scroll', function () {
    var cercle = document.getElementById('cercle');
    var cercle2 = document.querySelector('.cercle-2');
    var cercle3 = document.querySelector('.cercle-3');
    var cercle4 = document.getElementById('cercle4');
    var positionFromTop = cercle?.getBoundingClientRect().top;
    var positionFromTopCercle2 = cercle2?.getBoundingClientRect().top;
    var positionFromTopCercle3 = cercle3?.getBoundingClientRect().top;
    var positionFromTopCercle4 = cercle4?.getBoundingClientRect().top;
    var windowHeight = window.innerHeight;
    var iphone = document.querySelector('.iphone');
    var desctop = document.querySelector('.desctop');

    if (positionFromTop - windowHeight <= 0) {
      cercle.classList.add('large');
      iphone.classList.add('visible'); // Add 'visible' class to show the iPhone
    } else {
      cercle.classList.remove('large');
      iphone.classList.remove('visible'); // Remove 'visible' class to hide the iPhone
    }

    if (positionFromTopCercle2 - windowHeight <= 0) {
      cercle2.classList.add('visible'); // Add 'visible' class to show cercle-2
    } else {
      cercle2.classList.remove('visible'); // Remove 'visible' class to hide cercle-2
    }

    if (positionFromTopCercle3 - windowHeight <= 0) {
      cercle4.classList.add('large');
      desctop.classList.add('visible'); // Add 'large' class to enlarge cercle-3
    } else {
      cercle4.classList.remove('large');
      desctop.classList.remove('visible'); // Remove 'visible' class to hide the iPhone
    }

    if (positionFromTopCercle4 - windowHeight <= 0) {
      cercle3.classList.add('visible'); // Add 'visible' class to show cercle-4
    } else {
      cercle3.classList.remove('visible'); // Remove 'visible' class to hide cercle-4
    }
  });

  return (
    <div className='Home-Container'>
      <div>
        <svg width="100%" height="100%" viewBox="0 0 1440 957" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M596.5 811.5C385.279 1017.65 146.533 945.261 0 939.753V0H1579C1579 232.539 1552.62 832.899 1139.5 788.5C890.625 761.753 825.5 588 596.5 811.5Z" fill="#3C7ADF" />
          <path d="M339.051 324.17C282.691 464.798 84.6344 489.643 0 486.79V0H912C841.728 82.2016 818.227 196.317 579.618 173.319C435.872 159.464 420.317 121.398 339.051 324.17Z" fill="#6598EC" />
        </svg>
        <div className='logo'>
        </div>
        <div className='header'>
          <div className='div-title'>
            <h1 className='home-title'>physio for club management app</h1>
            <p className='title-p'>ClubManager delivers an unprecedented leap in member experience with everything needed to grow a successful club</p>
            <div className='login-div'>
              <button className='signin-butn' onClick={handleLoginClick}>Login</button>
              <Link to="" className='link-login'>you dont have an account ?</Link>
            </div>
          </div>
        </div>
        <div className='phone-section'>
        </div>
      </div>
      <div className='section-2'>
        <div className='phone-form'>
          <div className='cercle-2 hidden' id="cercle2">
          </div>
          <div class="cercle-1 hidden" id="cercle">
          </div>
          <div class="iphone-container hidden " >
            <svg className='iphone' id='cercle' width="639" height="846" viewBox="0 0 639 846" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_40_1468)">
                <g filter="url(#filter1_dii_40_1468)">
                  <rect x="245.586" y="50" width="316.61" height="608.866" rx="64" transform="rotate(15 245.586 50)" fill="white" />
                  <rect x="249.829" y="57.3485" width="304.61" height="596.866" rx="58" transform="rotate(15 249.829 57.3485)" stroke="#F1F1F1" stroke-width="12" />
                </g>
                <mask id="path-3-inside-1_40_1468" fill="white">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M294.866 90.0986C277.795 85.5245 260.248 95.6551 255.674 112.726L128.1 588.84C123.525 605.91 133.656 623.457 150.727 628.031L344.543 679.964C361.614 684.538 379.161 674.408 383.735 657.337L511.31 181.223C515.884 164.153 505.753 146.606 488.682 142.032L294.866 90.0986ZM457.141 141.862C458.284 137.595 455.752 133.208 451.484 132.064L332.064 100.066C327.796 98.9223 323.409 101.455 322.266 105.723L320.718 111.497C319.003 117.899 322.802 124.479 329.204 126.194L440.897 156.122C447.298 157.838 453.878 154.039 455.594 147.637L457.141 141.862Z" />
                </mask>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M294.866 90.0986C277.795 85.5245 260.248 95.6551 255.674 112.726L128.1 588.84C123.525 605.91 133.656 623.457 150.727 628.031L344.543 679.964C361.614 684.538 379.161 674.408 383.735 657.337L511.31 181.223C515.884 164.153 505.753 146.606 488.682 142.032L294.866 90.0986ZM457.141 141.862C458.284 137.595 455.752 133.208 451.484 132.064L332.064 100.066C327.796 98.9223 323.409 101.455 322.266 105.723L320.718 111.497C319.003 117.899 322.802 124.479 329.204 126.194L440.897 156.122C447.298 157.838 453.878 154.039 455.594 147.637L457.141 141.862Z" fill="#E3E6F5" />
                <path d="M150.727 628.031L150.986 627.065L150.727 628.031ZM344.543 679.964L344.285 680.93L344.543 679.964ZM329.204 126.194L329.462 125.228L329.204 126.194ZM440.897 156.122L440.638 157.088L440.897 156.122ZM451.484 132.064L451.225 133.03L451.484 132.064ZM332.064 100.066L332.322 99.1L332.064 100.066ZM256.64 112.985C261.071 96.4474 278.069 86.6333 294.607 91.0645L295.124 89.1327C277.52 84.4156 259.425 94.8629 254.708 112.467L256.64 112.985ZM129.066 589.098L256.64 112.985L254.708 112.467L127.134 588.581L129.066 589.098ZM150.986 627.065C134.448 622.634 124.634 605.636 129.066 589.098L127.134 588.581C122.417 606.185 132.864 624.28 150.468 628.997L150.986 627.065ZM344.802 678.998L150.986 627.065L150.468 628.997L344.285 680.93L344.802 678.998ZM382.769 657.078C378.338 673.616 361.34 683.43 344.802 678.998L344.285 680.93C361.889 685.647 379.984 675.2 384.701 657.596L382.769 657.078ZM510.344 180.965L382.769 657.078L384.701 657.596L512.275 181.482L510.344 180.965ZM488.423 142.997C504.961 147.429 514.775 164.427 510.344 180.965L512.275 181.482C516.993 163.878 506.545 145.783 488.941 141.066L488.423 142.997ZM294.607 91.0645L488.423 142.997L488.941 141.066L295.124 89.1327L294.607 91.0645ZM331.805 101.032L451.225 133.03L451.743 131.099L332.322 99.1L331.805 101.032ZM321.684 111.756L323.232 105.982L321.3 105.464L319.752 111.238L321.684 111.756ZM329.462 125.228C323.594 123.656 320.112 117.624 321.684 111.756L319.752 111.238C317.894 118.174 322.01 125.302 328.945 127.16L329.462 125.228ZM441.156 155.156L329.462 125.228L328.945 127.16L440.638 157.088L441.156 155.156ZM454.628 147.378C453.055 153.246 447.024 156.729 441.156 155.156L440.638 157.088C447.573 158.946 454.701 154.831 456.56 147.896L454.628 147.378ZM456.175 141.604L454.628 147.378L456.56 147.896L458.107 142.121L456.175 141.604ZM451.225 133.03C454.96 134.031 457.176 137.869 456.175 141.604L458.107 142.121C459.393 137.32 456.544 132.385 451.743 131.099L451.225 133.03ZM332.322 99.1C327.521 97.8135 322.586 100.663 321.3 105.464L323.232 105.982C324.232 102.247 328.071 100.031 331.805 101.032L332.322 99.1Z" fill="#E5E5EE" mask="url(#path-3-inside-1_40_1468)" />
                <rect x="360.835" y="116.439" width="41.7147" height="5.99457" rx="2.99728" transform="rotate(15 360.835 116.439)" fill="#F0F3F7" stroke="#E5E5EE" stroke-width="0.5" />
                <rect x="411.022" y="129.887" width="5.99457" height="5.99457" rx="2.99728" transform="rotate(15 411.022 129.887)" fill="#F0F3F7" stroke="#E5E5EE" stroke-width="0.5" />
              </g>
              <defs>
              </defs>
            </svg>
          </div>
        </div>
        <div className='mobile'>
          <h1>Mobile</h1>
          <h2>For manager</h2>
          <p>ClubManager delivers an unprecedented leap in member experience with everything needed to grow a successful club</p>
          <h2>For manager</h2>
          <p>ClubManager delivers an unprecedented leap in member experience with everything needed to grow a successful club</p>
          <div className='app-div'>
            <button className='btn-ios'>
              <img className='icone_apps' src={require('./../Assets/img/Mask group (2).png')} alt="Mon icône" />
              Download now
            </button>
            <button className='btn-android'><img className='icone_appios' src={require('./../Assets/img/Mask group (3).png')} alt="Mon icône" />Download now</button>
          </div>
        </div>
      </div>
      <div className='sectieon-3'>
        <div className='web-div'>
          <h1>web version</h1>
          <h2>For manager</h2>
          <p>ClubManager delivers an unprecedented leap in member experience with everything needed to grow a successful club</p>
          <h2>For manager</h2>
          <p>ClubManager delivers an unprecedented leap in member experience with everything needed to grow a successful club</p>
          <div className='app-div'>
            <button className='btn-web'>login</button>
          </div>
        </div>
        <div className='section-web'>
          <div>
          </div>
          <div className='cercle-3' id='cercle3'>
          </div>
          <div className='cercle-4' id='cercle4'>
            <div className='screan2 ' ></div>
            <div className='screan1'></div>
            <svg className='desctop' id='desctop' width="637" height="410" viewBox="0 0 637 410" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_40_1505)">
                <g opacity="0.4" filter="url(#filter1_f_40_1505)">
                  <ellipse cx="318.603" cy="362.972" rx="274.103" ry="3.02876" fill="black" />
                </g>
                <path d="M73.3633 36C73.3633 21.0883 85.4516 9 100.363 9H538.658C553.569 9 565.658 21.0883 565.658 36V339.587C565.658 341.244 564.314 342.587 562.658 342.587H76.3633C74.7064 342.587 73.3633 341.244 73.3633 339.587V36Z" fill="#E2E8F0" stroke="#CBD5E0" stroke-width="2" />
                <path d="M75.3916 33.0283C75.3916 20.878 85.2413 11.0283 97.3916 11.0283H541.628C553.779 11.0283 563.628 20.8781 563.628 33.0283V330.866H75.3916V33.0283Z" fill="#E2E8F0" />
                <rect x="85.084" y="26.7783" width="466.43" height="290.761" fill="white" />
                <path d="M13 343.165C13 342.06 13.8954 341.165 15 341.165H621.599C622.703 341.165 623.599 342.06 623.599 343.165V352.068H13V343.165Z" fill="#E2E8F0" />
                <path d="M13 343.165C13 342.06 13.8954 341.165 15 341.165H621.599C622.703 341.165 623.599 342.06 623.599 343.165V352.068H13V343.165Z" fill="url(#paint0_linear_40_1505)" />
                <path d="M13 352.068H623.599C599.776 361.277 574.456 366.001 548.915 366.001H81.2648C57.8039 366.001 34.5846 361.262 13 352.068Z" fill="#E2E8F0" />
                <path d="M13 352.068H623.599C599.776 361.277 574.456 366.001 548.915 366.001H81.2648C57.8039 366.001 34.5846 361.262 13 352.068Z" fill="url(#paint1_linear_40_1505)" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M268.042 341.165C268.354 345.9 272.294 349.645 277.108 349.645H360.097C364.911 349.645 368.851 345.9 369.163 341.165H268.042Z" fill="#E2E8F0" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M268.042 341.165C268.354 345.9 272.294 349.645 277.108 349.645H360.097C364.911 349.645 368.851 345.9 369.163 341.165H268.042Z" fill="url(#paint2_linear_40_1505)" />
              </g>
              <defs>
                <filter id="filter0_d_40_1505" x="1.4" y="0.4" width="633.799" height="381.2" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feMorphology radius="15" operator="erode" in="SourceAlpha" result="effect1_dropShadow_40_1505" />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="13.3" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_40_1505" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_40_1505" result="shape" />
                </filter>
                <filter id="filter1_f_40_1505" x="0.5" y="315.943" width="636.206" height="94.0576" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur stdDeviation="22" result="effect1_foregroundBlur_40_1505" />
                </filter>
                <linearGradient id="paint0_linear_40_1505" x1="13" y1="346.616" x2="623.599" y2="346.616" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#B7C2D0" />
                  <stop offset="0.0295345" stop-color="#CAD4DB" />
                  <stop offset="0.7" stop-color="#BECCDE" />
                  <stop offset="0.865867" stop-color="#B7C2D0" stop-opacity="0.3" />
                  <stop offset="0.865967" stop-color="#B7C2D0" stop-opacity="0.3" />
                  <stop offset="0.941937" stop-color="#BECCDE" />
                  <stop offset="0.971275" stop-color="#CAD4DB" />
                  <stop offset="0.996436" stop-color="#B7C2D0" />
                </linearGradient>
                <linearGradient id="paint1_linear_40_1505" x1="318.299" y1="352.068" x2="318.299" y2="366.001" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#D1DBE9" stop-opacity="0.6" />
                  <stop offset="1" stop-color="#AAB5C6" stop-opacity="0.6" />
                </linearGradient>
                <linearGradient id="paint2_linear_40_1505" x1="278.017" y1="346.313" x2="361.005" y2="346.313" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#CFD9E7" />
                  <stop offset="0.317518" stop-color="#CFD9E7" stop-opacity="0" />
                  <stop offset="0.660584" stop-color="#CFD9E7" stop-opacity="0" />
                  <stop offset="1" stop-color="#CFD9E7" />
                </linearGradient>
              </defs>
            </svg>
            <div className='screan1'></div>
          </div>
        </div>
      </div>
      <div className='section-4'>
        <div className='easy-dashboard'>
          <h1>Easy to use dashboard</h1>
          <p><img className='icon-dash' src={require('./../Assets/img/check-circle.png')} alt="Mon icône" /> ClubManager delivers an unprecedented</p>
          <p><img src={require('./../Assets/img/check-circle.png')} alt="Mon icône" /> ClubManager delivers an unprecedented</p>
          <p><img src={require('./../Assets/img/check-circle.png')} alt="Mon icône" /> ClubManager delivers an unprecedented</p>
          <p><img src={require('./../Assets/img/check-circle.png')} alt="Mon icône" /> ClubManager delivers an unprecedented</p>
          <p><img src={require('./../Assets/img/check-circle.png')} alt="Mon icône" /> ClubManager delivers an unprecedented</p>
        </div>
        <div className='dashboard-section'>
          <svg className='icone_dash1' width="122" height="122" viewBox="0 0 122 122" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_94_10533" maskUnits="userSpaceOnUse" x="0" y="0" width="122" height="122">
              <path d="M102.976 30.4019C100.342 33.0357 100.044 37.1519 101.723 40.4771C102.74 42.4915 103.605 44.5791 104.311 46.7223C105.475 50.258 108.596 52.9554 112.318 52.9554C116.561 52.9554 120 56.3946 120 60.6371V61.3629C120 65.6054 116.561 69.0446 112.318 69.0446C108.596 69.0446 105.475 71.742 104.311 75.2777C103.605 77.4209 102.74 79.5085 101.723 81.5229C100.044 84.8481 100.342 88.9643 102.976 91.5981C105.977 94.5988 105.977 99.4638 102.976 102.465L102.465 102.976C99.4638 105.977 94.5988 105.977 91.5981 102.976C88.9643 100.342 84.8481 100.044 81.5229 101.723C79.5085 102.74 77.4209 103.605 75.2777 104.311C71.742 105.475 69.0446 108.596 69.0446 112.318C69.0446 116.561 65.6054 120 61.3629 120H60.6371C56.3946 120 52.9554 116.561 52.9554 112.318C52.9554 108.596 50.258 105.475 46.7223 104.311C44.5791 103.605 42.4915 102.74 40.4771 101.723C37.1519 100.044 33.0357 100.342 30.4019 102.976C27.4012 105.977 22.5362 105.977 19.5355 102.976L19.0238 102.465C16.0231 99.4638 16.0231 94.5988 19.0238 91.5981C21.6576 88.9643 21.9558 84.8481 20.2773 81.5229C19.2605 79.5085 18.3954 77.4209 17.6893 75.2777C16.5245 71.742 13.4045 69.0446 9.68178 69.0446C5.43925 69.0446 2 65.6054 2 61.3629V60.6371C2 56.3946 5.43925 52.9554 9.68178 52.9554C13.4045 52.9554 16.5245 50.258 17.6893 46.7223C18.3954 44.5791 19.2605 42.4915 20.2773 40.4771C21.9558 37.1519 21.6576 33.0357 19.0238 30.4019C16.0231 27.4012 16.0231 22.5362 19.0238 19.5355L19.5355 19.0238C22.5362 16.0231 27.4012 16.0231 30.4019 19.0238C33.0357 21.6576 37.1519 21.9558 40.4771 20.2773C42.4915 19.2605 44.5791 18.3954 46.7223 17.6893C50.258 16.5245 52.9554 13.4045 52.9554 9.68178C52.9554 5.43925 56.3946 2 60.6371 2H61.3629C65.6054 2 69.0446 5.43925 69.0446 9.68178C69.0446 13.4045 71.742 16.5245 75.2777 17.6893C77.4209 18.3954 79.5085 19.2605 81.5229 20.2773C84.8481 21.9558 88.9643 21.6576 91.5981 19.0238C94.5988 16.0231 99.4638 16.0231 102.465 19.0238L102.976 19.5355C105.977 22.5362 105.977 27.4012 102.976 30.4019Z" fill="white" stroke="white" stroke-width="4" stroke-linejoin="round" />
              <path d="M61 75.75C64.9119 75.75 68.6637 74.196 71.4298 71.4298C74.196 68.6637 75.75 64.9119 75.75 61C75.75 57.0881 74.196 53.3363 71.4298 50.5702C68.6637 47.804 64.9119 46.25 61 46.25C57.0881 46.25 53.3363 47.804 50.5702 50.5702C47.804 53.3363 46.25 57.0881 46.25 61C46.25 64.9119 47.804 68.6637 50.5702 71.4298C53.3363 74.196 57.0881 75.75 61 75.75Z" fill="black" stroke="black" stroke-width="4" stroke-linejoin="round" />
            </mask>
            <g mask="url(#mask0_94_10533)">
              <path d="M-9.7998 -1.79981C-9.7998 -6.21809 -6.21808 -9.7998 -1.7998 -9.7998H123.8C128.218 -9.7998 131.8 -6.21808 131.8 -1.7998V123.8C131.8 128.218 128.218 131.8 123.8 131.8H-1.79981C-6.21809 131.8 -9.7998 128.218 -9.7998 123.8V-1.79981Z" fill="white" />
            </g>
          </svg>
          <svg className='icone_dash2' width="188" height="188" viewBox="0 0 188 188" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_94_10532" maskUnits="userSpaceOnUse" x="0" y="0" width="188" height="188">
              <path d="M157.096 48.6466C154.353 51.3889 154.018 55.6808 155.927 59.0565C158.756 64.0589 160.964 69.3878 162.503 74.9247C163.541 78.66 166.813 81.4558 170.689 81.4558H178C182.418 81.4558 186 85.0375 186 89.4558V98.5442C186 102.962 182.418 106.544 178 106.544H170.689C166.813 106.544 163.541 109.34 162.503 113.075C160.964 118.612 158.756 123.941 155.927 128.943C154.018 132.319 154.353 136.611 157.096 139.353L162.27 144.528C165.394 147.652 165.394 152.717 162.27 155.841L155.841 162.27C152.717 165.394 147.652 165.394 144.528 162.27L139.353 157.096C136.611 154.353 132.319 154.018 128.943 155.927C123.941 158.756 118.612 160.964 113.075 162.503C109.34 163.541 106.544 166.813 106.544 170.689V178C106.544 182.418 102.962 186 98.5442 186H89.4558C85.0375 186 81.4558 182.418 81.4558 178V170.689C81.4558 166.813 78.66 163.541 74.9247 162.503C69.3878 160.964 64.0589 158.756 59.0565 155.927C55.6808 154.018 51.3889 154.353 48.6467 157.096L43.4725 162.27C40.3483 165.394 35.2829 165.394 32.1587 162.27L25.7303 155.841C22.6061 152.717 22.6061 147.652 25.7303 144.528L30.9045 139.353C33.6467 136.611 33.9823 132.319 32.0733 128.943C29.2445 123.941 27.036 118.612 25.497 113.075C24.4588 109.34 21.1874 106.544 17.3105 106.544H10C5.58173 106.544 2 102.962 2 98.5442V89.4558C2 85.0375 5.58172 81.4558 10 81.4558H17.3105C21.1874 81.4558 24.4588 78.66 25.497 74.9247C27.036 69.3878 29.2445 64.0589 32.0733 59.0565C33.9823 55.6808 33.6467 51.3889 30.9045 48.6467L25.7303 43.4725C22.6061 40.3483 22.6061 35.2829 25.7303 32.1587L32.1587 25.7303C35.2829 22.6061 40.3483 22.6061 43.4725 25.7303L48.6466 30.9044C51.3889 33.6467 55.6808 33.9823 59.0565 32.0733C64.0589 29.2445 69.3878 27.036 74.9247 25.497C78.66 24.4588 81.4558 21.1874 81.4558 17.3105V10C81.4558 5.58173 85.0375 2 89.4558 2H98.5442C102.962 2 106.544 5.58172 106.544 10V17.3105C106.544 21.1874 109.34 24.4588 113.075 25.497C118.612 27.036 123.941 29.2445 128.943 32.0733C132.319 33.9823 136.611 33.6467 139.353 30.9045L144.528 25.7302C147.652 22.6061 152.717 22.6061 155.841 25.7303L162.27 32.1587C165.394 35.2829 165.394 40.3483 162.27 43.4725L157.096 48.6466Z" fill="white" stroke="white" stroke-width="4" stroke-linejoin="round" />
              <path d="M94 117C100.1 117 105.95 114.577 110.263 110.263C114.577 105.95 117 100.1 117 94C117 87.9 114.577 82.0499 110.263 77.7365C105.95 73.4232 100.1 71 94 71C87.9 71 82.0499 73.4232 77.7365 77.7365C73.4232 82.0499 71 87.9 71 94C71 100.1 73.4232 105.95 77.7365 110.263C82.0499 114.577 87.9 117 94 117Z" fill="black" stroke="black" stroke-width="4" stroke-linejoin="round" />
            </mask>
            <g mask="url(#mask0_94_10532)">
              <path d="M-16.4004 -8.39989C-16.4004 -12.8182 -12.8187 -16.3999 -8.40039 -16.3999H196.4C200.818 -16.3999 204.4 -12.8182 204.4 -8.3999V196.4C204.4 200.818 200.818 204.4 196.4 204.4H-8.40038C-12.8187 204.4 -16.4004 200.818 -16.4004 196.4V-8.39989Z" fill="#406AAF" />
            </g>
          </svg>
          <div className='dashboard1'>
            <div className='screan3'></div>
          </div>
          <svg className='icone_dash3' width="106" height="106" viewBox="0 0 106 106" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_94_10543" maskUnits="userSpaceOnUse" x="0" y="0" width="106" height="106">
              <path d="M89.2846 26.5508C87.0078 28.8275 86.75 32.3855 88.201 35.2598C89.0799 37.0011 89.8277 38.8056 90.438 40.6582C91.4449 43.7146 94.1419 46.0462 97.3598 46.0462C101.027 46.0462 104 49.0191 104 52.6863V53.3137C104 56.9809 101.027 59.9538 97.3598 59.9538C94.1419 59.9538 91.4449 62.2854 90.438 65.3418C89.8277 67.1944 89.0799 68.9989 88.201 70.7401C86.75 73.6145 87.0078 77.1725 89.2846 79.4492C91.8784 82.043 91.8783 86.2484 89.2845 88.8422L88.8422 89.2845C86.2484 91.8783 82.043 91.8784 79.4492 89.2846C77.1725 87.0078 73.6145 86.75 70.7401 88.201C68.9989 89.0799 67.1944 89.8277 65.3418 90.438C62.2854 91.4449 59.9538 94.1419 59.9538 97.3598C59.9538 101.027 56.9809 104 53.3137 104H52.6863C49.0191 104 46.0462 101.027 46.0462 97.3598C46.0462 94.1419 43.7146 91.4449 40.6582 90.438C38.8056 89.8277 37.0011 89.0799 35.2598 88.201C32.3855 86.75 28.8275 87.0078 26.5508 89.2846C23.957 91.8784 19.7516 91.8784 17.1578 89.2846L16.7155 88.8422C14.1216 86.2484 14.1216 82.043 16.7154 79.4492C18.9922 77.1725 19.25 73.6145 17.799 70.7401C16.9201 68.9989 16.1723 67.1944 15.562 65.3418C14.5551 62.2854 11.8581 59.9538 8.64018 59.9538C4.97291 59.9538 2 56.9809 2 53.3137V52.6863C2 49.0191 4.97291 46.0462 8.64018 46.0462C11.8581 46.0462 14.5551 43.7146 15.562 40.6582C16.1723 38.8056 16.9201 37.0011 17.799 35.2598C19.25 32.3855 18.9922 28.8275 16.7154 26.5508C14.1216 23.957 14.1216 19.7516 16.7154 17.1578L17.1578 16.7155C19.7516 14.1216 23.957 14.1216 26.5508 16.7154C28.8275 18.9922 32.3855 19.25 35.2598 17.799C37.0011 16.9201 38.8056 16.1723 40.6582 15.562C43.7146 14.5551 46.0462 11.8581 46.0462 8.64018C46.0462 4.97291 49.0191 2 52.6863 2H53.3137C56.9809 2 59.9538 4.97291 59.9538 8.64018C59.9538 11.8581 62.2854 14.5551 65.3418 15.562C67.1944 16.1723 68.9989 16.9201 70.7402 17.799C73.6145 19.25 77.1725 18.9922 79.4492 16.7154C82.043 14.1216 86.2484 14.1216 88.8422 16.7155L89.2845 17.1578C91.8783 19.7516 91.8784 23.957 89.2846 26.5508Z" fill="white" stroke="white" stroke-width="4" stroke-linejoin="round" />
              <path d="M53 65.75C56.3815 65.75 59.6245 64.4067 62.0156 62.0156C64.4067 59.6245 65.75 56.3815 65.75 53C65.75 49.6185 64.4067 46.3755 62.0156 43.9844C59.6245 41.5933 56.3815 40.25 53 40.25C49.6185 40.25 46.3755 41.5933 43.9844 43.9844C41.5933 46.3755 40.25 49.6185 40.25 53C40.25 56.3815 41.5933 59.6245 43.9844 62.0156C46.3755 64.4067 49.6185 65.75 53 65.75Z" fill="black" stroke="black" stroke-width="4" stroke-linejoin="round" />
            </mask>
            <g mask="url(#mask0_94_10543)">
              <path d="M-8.2002 -0.200189C-8.2002 -4.61847 -4.61847 -8.2002 -0.200195 -8.2002H106.2C110.618 -8.2002 114.2 -4.61847 114.2 -0.200195V106.2C114.2 110.618 110.618 114.2 106.2 114.2H-0.200189C-4.61847 114.2 -8.2002 110.618 -8.2002 106.2V-0.200189Z" fill="#5088E5" />
            </g>
          </svg>
        </div>
      </div>
      <div className='section-5'>
        <svg className='ellips1' width="272" height="548" viewBox="0 0 272 548" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M272 244C272 411.895 135.895 548 -32 548C-199.895 548 -336 411.895 -336 244C-336 76.1054 -199.895 -60 -32 -60C135.895 -60 272 76.1054 272 244ZM-207.248 244C-207.248 340.787 -128.787 419.248 -32 419.248C64.7868 419.248 143.248 340.787 143.248 244C143.248 147.213 64.7868 68.752 -32 68.752C-128.787 68.752 -207.248 147.213 -207.248 244Z" fill="#6598EC" />
        </svg>
        <div className='pricing'>
          <h1>Pricing</h1>
          <h2>Silver pack 56 $ per month</h2>
          <h5>no hidden taxes</h5>
          <div className='silvers'>
            <div className='silver1' id='s1lver1' >
              <h2>Silver</h2>
              <h1>50 $</h1>
              <p className='p3'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              <p className='p4'>@ ClubManager delivers an unprecedented </p>
              <p className='p4'>@ ClubManager delivers an unprecedented </p>
              <p className='p4'>@ ClubManager delivers an unprecedented </p>
              <p className='p4'>@ ClubManager delivers an unprecedented </p>
              <p className='p4'>@ ClubManager delivers an unprecedented </p>
              <button className='silver-btn1'>buy Now</button>
            </div>
            <div className='silver2'>
              <h2>Silver</h2>
              <h1>70 $</h1>
              <p className='p1'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              <p className='p2'>@ ClubManager delivers an unprecedented </p>
              <p className='p2'>@ ClubManager delivers an unprecedented </p>
              <p className='p2'>@ ClubManager delivers an unprecedented </p>
              <p className='p2'>@ ClubManager delivers an unprecedented </p>
              <p className='p2'>@ ClubManager delivers an unprecedented </p>
              <button className='silver-btn2'>buy Now</button>
            </div>
            <div className='silver1' >
              <h2>Silver</h2>
              <h1>50 $</h1>
              <p className='p3'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              <p className='p4'>@ ClubManager delivers an unprecedented </p>
              <p className='p4'>@ ClubManager delivers an unprecedented </p>
              <p className='p4'>@ ClubManager delivers an unprecedented </p>
              <p className='p4'>@ ClubManager delivers an unprecedented </p>
              <p className='p4'>@ ClubManager delivers an unprecedented </p>
              <button className='silver-btn1'>buy Now</button>
            </div>
          </div>
        </div>
        <svg className='ellips2' width="299" height="488" viewBox="0 0 299 488" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M488 244C488 378.757 378.757 488 244 488C109.243 488 0 378.757 0 244C0 109.243 109.243 0 244 0C378.757 0 488 109.243 488 244ZM103.34 244C103.34 321.684 166.316 384.66 244 384.66C321.684 384.66 384.66 321.684 384.66 244C384.66 166.316 321.684 103.34 244 103.34C166.316 103.34 103.34 166.316 103.34 244Z" fill="#3D7ADF" />
        </svg>
      </div>
      <div className='section-6'>
        <div className='features-title'>
          <h1>Features</h1>
          <p>ClubManager delivers an unprecedented leap in member experience with everything needed to grow a successful club</p>
        </div>
        <div>
          <div className='features1'>
            <div className='feature' id='slid'>
              <h2>Lorem ipsum</h2>
              <h5>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when </h5>
            </div>
            <div className='feature'>
              <h2>Lorem ipsum</h2>
              <h5>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when </h5>
            </div>
          </div>
          <div className='features2'>
            <div className='feature' id='slid'>
              <h2>Lorem ipsum</h2>
              <h5>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when </h5>
            </div>
            <div className='feature'>
              <h2>Lorem ipsum</h2>
              <h5>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when </h5>
            </div>
          </div>
          <div className='features3'>
            <div className='feature' id='slid'>
              <h2>Lorem ipsum</h2>
              <h5>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when </h5>
            </div>
            <div className='feature'>
              <h2>Lorem ipsum</h2>
              <h5>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when </h5>
            </div>
          </div>
        </div>
      </div>
      <div className='section-7'>
        <div className='client-div'>
          <h1>Our Client</h1>
          <p>The most powerful finance software that connects with your financial accounts. Track spending and categorize expenses so you can see where your money is going.</p>
          <button>Get Started</button>
        </div>
        <div className='cercles-div'>
          <div className='round-1' >
            <svg width="100%" height="100%" viewBox="0 0 541 542" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="270.29" cy="270.862" r="269.254" transform="rotate(-178.925 270.29 270.862)" stroke="#3C7ADF" stroke-width="2" />
            </svg>
            <div className='esz-logo'>
            </div>
            <div className='ess-logo'>
            </div>
          </div>
          <div className='physio-logo'>
          </div>
          <div2 className='round-2'>
            <svg width="100%" height="100%" viewBox="0 0 287 287" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="143.394" cy="143.394" r="132.878" transform="rotate(94.0918 143.394 143.394)" stroke="#3C7ADF" stroke-width="2" />
            </svg>
            <div className='etihad-logo'>
            </div>
            <div className='club-logo'>
            </div>
          </div2>
        </div>
      </div>
      <footer className='footer'>
        <div className='footer-1'>
          <div className='footer-title'>
            <div className='footer-logo'>
            </div>
            <h1>Physio</h1>
          </div>
          <p>Lorem ipsum dolor sit amet consectetur. Arcu non magna vestibulum quis sed dolor hac vitae. Rhoncus imperdiet lorem pharetra massa. </p>
          <div className='h4-footer'>
            <h4>Lorem espium</h4>
            <h4>Lorem espium</h4>
            <h4>Lorem espium</h4>
          </div>
          <div className='footer-link'>
            <Link to=""> <img src={require('./../Assets/img/twiter.png')} alt="Mon icône" /></Link>
            <Link to=""> <img className='link-twiter' src={require('./../Assets/img/Social icon.png')} alt="Mon icône" /></Link>
            <Link to=""><img src={require('./../Assets/img/facbook.png')} alt="Mon icône" /></Link>
          </div>
          <div className='footer-app'>
            <h4>Get the app</h4>
            <button className='footer-btn1'></button>
            <button className='footer-btn'></button>
          </div>
        </div>
        <p className='righs'>© 2024 Fysio. All rights reserved</p>
      </footer>
    </div>
  );
}
export default Home;  
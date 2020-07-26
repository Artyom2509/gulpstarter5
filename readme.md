<h1>Gulp starter 5</h1>
<p>Lightweight startup HTML5 template, based on Gulp.</p>

<p>
	<img src="https://raw.githubusercontent.com/agragregra/oh5/master/app/images/src/preview.jpg" alt="Start HTML Template">
</p>

<p><strong>Gulp starter 5</strong> - lightweight startup HTML5 template with <strong>Gulp 4</strong>, <strong>Sass/Scss/Less/Stylus</strong>, <strong>Browsersync</strong>, <strong>Autoprefixer</strong>, <strong>Uglify-ES</strong>, <strong>Clean-CSS</strong>, <strong>Rsync</strong>, <strong>CSS Reboot</strong> (Bootstrap reboot). It uses best practices for <strong>responsive images</strong> optimizing and contains a <strong>.htaccess</strong> file for resources caching (images, fonts, HTML, CSS, JS and other content types).</p>

<h2>How to use Gulp starter 5</h2>

<pre>git clone https://github.com/artyom2509/gulpstarter5</pre>

<ol>
	<li>Install Node Modules: <strong>npm i</strong></li>
	<li>Run: <strong>gulp</strong></li>
</ol>

<h2>Main Gulp tasks:</h2>

<ul>
	<li><strong title="gulp task"><em>gulp</em></strong>: run default gulp task (vars, grid, images, styles, scripts, otherScripts, browsersync, startwatch)</li>
	<li><strong title="grid task"><em>smart-grid</em></strong>: Create adaptive CSS? It's fast and easy! With <strong>Smart Grid!</strong></li>
	<li><strong title="cleanimg task"><em>cleanimg</em></strong>: Clean all compressed images</li>
	<li><strong title="styles, scripts, images, assets tasks"><em>styles, scripts, images, assets</em></strong>: build assets (cleanimg, styles, scripts, images)</li>
	<li><strong title="rsync task"><em>rsync</em></strong>: project deployment via <strong>RSYNC</strong></li>
</ul>

<h2>Basic rules</h2>

<ol>
	<li>All custom <strong title="scripts task"><em>scripts</em></strong> located in <strong>app/js/app.js</strong></li>
	<li>All custom <strong title="styles task"><em>styles</em></strong> located in <strong>app/{preprocessor}/main.sass|scss|less|styl</strong></li>
	<li>All preprocessor <strong>configs</strong> placed in <strong>app/{preprocessor}/_config.sass|scss|less|styl</strong></li>
	<li>You can <strong>delete folders</strong> of other preprocessors before work.</li>
	<li>All <strong>images</strong> sources placed in <strong>app/images/src/</strong> folder.</li>
</ol>


<h2>Included features</h2>

<p>Description is under construction.</p>

<!-- <h2>Caching</h2>

<p>Rename <strong>ht.access</strong> to <strong>.htaccess</strong> before place it in your web server. This file contain rules for htaccess resources caching.</p>
 -->

<h2>Helpers</h2>

<h3>font-weight helper</h3>

<ul>
	<li><strong>100</strong> - Extra Light or Ultra Light</li>
	<li><strong>200</strong> - Light or Thin</li>
	<li><strong>300</strong> - Book or Demi</li>
	<li><strong>400</strong> - Regular or Normal</li>
	<li><strong>500</strong> - Medium</li>
	<li><strong>600</strong> - Semibold or Demibold</li>
	<li><strong>700</strong> - Bold</li>
	<li><strong>800</strong> - Black or Extra Bold or Heavy</li>
	<li><strong>900</strong> - Extra Black or Fat or Ultra Blac</li>
</ul>

<h2>Issues</h2>

<ol>
	<li>Long Preprocessor compile: Disable the "safe write" option in PHPStorm settings.</li>
</ol>

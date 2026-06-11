{*+**********************************************************************************
* The contents of this file are subject to the vtiger CRM Public License Version 1.1
* ("License"); You may not use this file except in compliance with the License
* The Original Code is: vtiger CRM Open Source
* The Initial Developer of the Original Code is vtiger.
* Portions created by vtiger are Copyright (C) vtiger.
* All Rights Reserved.
************************************************************************************}

<footer class="app-footer">
	<p>
		Powered by vtiger CRM - {$VTIGER_VERSION}&nbsp;&nbsp;© 2004 - {date('Y')}&nbsp;&nbsp;
		<a href="//www.vtiger.com" target="_blank">Vtiger</a>&nbsp;|&nbsp;
		<a href="https://www.vtiger.com/privacy-policy" target="_blank">Privacy Policy</a>
	</p>
</footer>

{* Mobile bottom navigation bar (app-like). Rendered only for authenticated
   users; styles in layouts/v7/resources/mobile-nav.css keep it hidden on desktop. *}
{assign var=MOBILE_NAV_USER value=Users_Record_Model::getCurrentUserModel()}
{if $MOBILE_NAV_USER && $MOBILE_NAV_USER->get('id')}
	{assign var=MOBILE_NAV_PRIVILEGES value=Users_Privileges_Model::getCurrentUserPrivilegesModel()}
	{assign var=MOBILE_NAV_CONTACTS value=Vtiger_Module_Model::getInstance('Contacts')}
	{assign var=MOBILE_NAV_CALENDAR value=Vtiger_Module_Model::getInstance('Calendar')}
	{assign var=MOBILE_NAV_POTENTIALS value=Vtiger_Module_Model::getInstance('Potentials')}
	<nav class="mobile-bottom-nav" role="navigation">
		{if $MOBILE_NAV_CONTACTS && $MOBILE_NAV_PRIVILEGES->hasModulePermission($MOBILE_NAV_CONTACTS->getId())}
			<a class="mobile-nav-item{if $MODULE eq 'Contacts'} active{/if}" href="index.php?module=Contacts&view={$MOBILE_NAV_CONTACTS->getDefaultViewName()}">
				<span class="mobile-nav-icon fa fa-users" aria-hidden="true"></span>
				<span class="mobile-nav-label">{vtranslate('Contacts','Contacts')}</span>
			</a>
		{/if}
		{if $MOBILE_NAV_CALENDAR && $MOBILE_NAV_PRIVILEGES->hasModulePermission($MOBILE_NAV_CALENDAR->getId())}
			<a class="mobile-nav-item{if $MODULE eq 'Calendar' || $MODULE eq 'Events'} active{/if}" href="index.php?module=Calendar&view={$MOBILE_NAV_CALENDAR->getDefaultViewName()}">
				<span class="mobile-nav-icon fa fa-calendar" aria-hidden="true"></span>
				<span class="mobile-nav-label">{vtranslate('Calendar','Calendar')}</span>
			</a>
		{/if}
		{if $MOBILE_NAV_POTENTIALS && $MOBILE_NAV_PRIVILEGES->hasModulePermission($MOBILE_NAV_POTENTIALS->getId())}
			<a class="mobile-nav-item{if $MODULE eq 'Potentials'} active{/if}" href="index.php?module=Potentials&view={$MOBILE_NAV_POTENTIALS->getDefaultViewName()}">
				<span class="mobile-nav-icon fa fa-usd" aria-hidden="true"></span>
				<span class="mobile-nav-label">{vtranslate('Potentials','Potentials')}</span>
			</a>
		{/if}
	</nav>
	<script type="text/javascript">document.body.classList.add('has-mobile-bottom-nav');</script>
{/if}
</div>
<div id='overlayPage'>
	<!-- arrow is added to point arrow to the clicked element (Ex:- TaskManagement), 
	any one can use this by adding "show" class to it -->
	<div class='arrow'></div>
	<div class='data'>
	</div>
</div>
<div id='helpPageOverlay'></div>
<div id="js_strings" class="hide noprint">{Zend_Json::encode($LANGUAGE_STRINGS)}</div>
<div class="modal myModal fade"></div>
{include file='JSResources.tpl'|@vtemplate_path}
</body>

</html>
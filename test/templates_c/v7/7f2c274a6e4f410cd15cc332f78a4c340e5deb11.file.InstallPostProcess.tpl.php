<?php /* Smarty version Smarty-3.1.7, created on 2026-06-09 08:18:22
         compiled from "/home/u347972489/domains/vtiger.holaenroque.com/public_html/includes/runtime/../../layouts/v7/modules/Install/InstallPostProcess.tpl" */ ?>
<?php /*%%SmartyHeaderCode:14552192866a27be3e6fb6e5-41486638%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '7f2c274a6e4f410cd15cc332f78a4c340e5deb11' => 
    array (
      0 => '/home/u347972489/domains/vtiger.holaenroque.com/public_html/includes/runtime/../../layouts/v7/modules/Install/InstallPostProcess.tpl',
      1 => 1627027149,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '14552192866a27be3e6fb6e5-41486638',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'VTIGER_VERSION' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_6a27be3e70051',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_6a27be3e70051')) {function content_6a27be3e70051($_smarty_tpl) {?>

<br>
<center>
	<footer class="noprint">
		<div class="vtFooter">
			<p>
				<?php echo vtranslate('POWEREDBY');?>
 <?php echo $_smarty_tpl->tpl_vars['VTIGER_VERSION']->value;?>
&nbsp;
				&copy; 2004 - <?php echo date('Y');?>
&nbsp;
				<a href="//www.vtiger.com" target="_blank">vtiger.com</a>
				&nbsp;|&nbsp;
				<a href="#" onclick="window.open('copyright.html', 'copyright', 'height=115,width=575').moveTo(210, 620)"><?php echo vtranslate('LBL_READ_LICENSE');?>
</a>
				&nbsp;|&nbsp;
				<a href="https://www.vtiger.com/privacy-policy" target="_blank"><?php echo vtranslate('LBL_PRIVACY_POLICY');?>
</a>
			</p>
		</div>
	</footer>
</center>
<?php echo $_smarty_tpl->getSubTemplate (vtemplate_path('JSResources.tpl'), $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>

</div>
<?php }} ?>
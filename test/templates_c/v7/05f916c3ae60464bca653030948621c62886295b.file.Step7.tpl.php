<?php /* Smarty version Smarty-3.1.7, created on 2026-06-09 08:18:36
         compiled from "/home/u347972489/domains/vtiger.holaenroque.com/public_html/includes/runtime/../../layouts/v7/modules/Install/Step7.tpl" */ ?>
<?php /*%%SmartyHeaderCode:5466141906a27be4c88d729-47834327%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '05f916c3ae60464bca653030948621c62886295b' => 
    array (
      0 => '/home/u347972489/domains/vtiger.holaenroque.com/public_html/includes/runtime/../../layouts/v7/modules/Install/Step7.tpl',
      1 => 1627027149,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '5466141906a27be4c88d729-47834327',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'APPUNIQUEKEY' => 0,
    'CURRENT_VERSION' => 0,
    'INDUSTRY' => 0,
    'PASSWORD' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_6a27be4c890e0',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_6a27be4c890e0')) {function content_6a27be4c890e0($_smarty_tpl) {?>

<center><?php echo vtranslate('LBL_LOADING_PLEASE_WAIT');?>
...</center>

<form class="form-horizontal" name="step7" method="post" action="?module=Users&action=Login">
	<img src="//stats.vtiger.com/stats.php?uid=<?php echo $_smarty_tpl->tpl_vars['APPUNIQUEKEY']->value;?>
&v=<?php echo $_smarty_tpl->tpl_vars['CURRENT_VERSION']->value;?>
&type=I&industry=<?php echo urlencode($_smarty_tpl->tpl_vars['INDUSTRY']->value);?>
" alt='' title='' border=0 width='1px' height='1px'>
	<input type=hidden name="username" value="admin" >
	<input type=hidden name="password" value="<?php echo $_smarty_tpl->tpl_vars['PASSWORD']->value;?>
" >
</form>
<script type="text/javascript">
	jQuery(function () { /* Delay to let page load complete */
		setTimeout(function () {
			jQuery('form[name="step7"]').submit();
		}, 150);
	});
</script>
<?php }} ?>
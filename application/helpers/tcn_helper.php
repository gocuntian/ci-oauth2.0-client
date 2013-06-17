<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 *
 * @package		ci-template
 * @author		donald
 * @link		http://www.ruyipu.com
 * @since		Version 1.0
 * @filesource
 */


function is_post()
{
	return $_SERVER['REQUEST_METHOD']==='POST';
}

function is_xhr() {
	return isset( $_SERVER['HTTP_X_REQUESTED_WITH'] );
}

function is_ajax()
{
	return is_xhr() || isset($_GET['ajax']) || isset($_POST['ajax']);
}

function dd($value='')
{
	dump($value);
	die;
}

function dump($value='')
{
	echo '<pre>';
	var_dump($value);
	echo '</pre>';
}

function array_from_post($fields=array())
{
	$ci =& get_instance();
	$data = array();
	foreach ($fields as $field) {
		$data[$field] = $ci->input->post($field);
	}
	return $data;
}
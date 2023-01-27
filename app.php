<?php
use ExpoSDK\Expo;
use ExpoSDK\ExpoMessage;

//Criando o texto da mensagem
$mensagem = (new ExpoMessage([
    'title' => 'initial title',
    'body' => 'initial body',
]))
    ->setTitle('Não perca tempo!')
    ->setBody('Compre já nossos produtos na Webine')
    ->setData(['id' => 1])
    ->setChannelId('default')
    ->setBadge(0)
    ->playSound();


	$messages = [
		[
			'title' => 'Test notification',
			'to' => 'ExponentPushToken[xxxx-xxxx-xxxx]',
		],
		new ExpoMessage([
			'title' => 'Notification for default recipients',
			'body' => 'Because "to" property is not defined',
		]),
	];
	
	/**
	 * These recipients are used when ExpoMessage does not have "to" set
	 */
	$defaultRecipients = [
		'ExponentPushToken[xxxx-xxxx-xxxx]',
		'ExponentPushToken[yyyy-yyyy-yyyy]'
	];
	
	(new Expo)->send($messages)->to($defaultRecipients)->push();




?>
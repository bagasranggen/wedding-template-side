<?php
require_once '../vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader($_SERVER['DOCUMENT_ROOT'] . '/templates');
$twig = new \Twig\Environment($loader);

$navigation = [
    'navigation' => [
        [
            'main' => 'Why Adnavem',
            'active' => 'why',
            'sub' => [
                ['label' => 'Benefit For Cargo Owner', 'link' => '/benefit.php'],
                ['label' => 'Sell Through Adnavem', 'link' => '/sell.php'],
            ]
        ],
        [
            'main' => 'Solution',
            'active' => 'solution',
            'sub' => [
                ['label' => 'Marketplace', 'link' => '/marketplace.php'],
                ['label' => 'Control Tower', 'link' => '#'],
                ['label' => 'Order Management', 'link' => '#'],
                ['label' => 'Multimodal TMS', 'link' => '#'],
            ]
        ],
        [
            'main' => 'Resources',
            'active' => 'resources',
            'sub' => [
                ['label' => 'Success Stories', 'link' => '/success.php'],
                ['label' => 'Blog', 'link' => '/blog.php'],
                ['label' => 'Webinars', 'link' => '/webinars.php'],
                ['label' => 'FAQ', 'link' => '/faq.php'],
                ['label' => 'Academy', 'link' => '/academy.php'],
                ['label' => 'Incoterms', 'link' => '#'],
                ['label' => 'Instant Rates', 'link' => '#'],
                ['label' => 'Glossary', 'link' => '/glossary.php'],
            ]
        ],
        [
            'main' => 'Company',
            'active' => 'company',
            'sub' => [
                ['label' => 'About Us', 'link' => '/about-us.php'],
                ['label' => 'Teams', 'link' => '/teams.php'],
                ['label' => 'Careers', 'link' => '/career.php'],
                ['label' => 'Media', 'link' => '/media.php'],
                ['label' => 'Contact', 'link' => '/contact.php'],
            ]
        ]
    ],
    'languages' => ['Dutch', 'English']
];

echo $twig->render($template, isset($data) ? array_merge($navigation, $data) : $navigation);
?>
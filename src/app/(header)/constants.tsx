import {
    DrawerIcon,
    EyesIcon,
    FaceIcon,
    HomeIcon,
    MicrophoneIcon,
    PlusPlusIcon,
    ThumbsUpIcon,
} from '~/components/icons';

const leftSidebarActions = [
    {
        title: '',
        items: [
            {
                title: 'Home',
                url: '#',
                icon: HomeIcon,
            },
            {
                title: 'Dev++',
                url: '#',
                icon: PlusPlusIcon,
            },
            {
                title: 'Reading List',
                url: '#',
                icon: DrawerIcon,
            },
            {
                title: 'Podcasts',
                url: '#',
                icon: MicrophoneIcon,
            },
        ],
    },
    {
        title: 'Other',
        items: [
            {
                title: 'Code of Conduct',
                url: '#',
                icon: ThumbsUpIcon,
            },
            {
                title: 'Privacy Policy',
                url: '#',
                icon: FaceIcon,
            },
            {
                title: 'Terms of Use',
                url: '#',
                icon: EyesIcon,
            },
        ],
    },
];

const profileDropdownActions = [
    [
        {
            title: 'Dashboard',
            url: '/dashboard',
        },
        {
            title: 'Create Post',
            url: '/compose',
        },
        {
            title: 'Reading List',
            url: '/favorites',
        },
        {
            title: 'Settings',
            url: '/settings',
        },
    ],
    [
        {
            title: 'Sign Out',
            url: '/api/auth/signout',
        },
    ],
];

const tempNews = [
    {
        title: 'How to Build Your Frontend Apps 10x Faster!',
        path: '/apidog/how-to-mock-apis-in-40s-and-build-frontend-apps-10x-faster-4d3i',
        id: 2131134,
        user_id: 972096,
        comments_count: 5,
        reactions_count: 90,
        organization_id: 9521,
        reading_time: 5,
        video_thumbnail_url: null,
        video: null,
        video_duration_in_minutes: '00:00',
        edited_at: '2024-12-07T06:32:10.920Z',
        experience_level_rating: 6.7368421052631575,
        experience_level_rating_distribution: 5.0,
        main_image_height: 420,
        type_of: 'full_post',
        user: {
            name: 'Ismail Kamil',
            username: 'ismailkamil',
            slug: 'ismailkamil',
            profile_image_90:
                'https://media2.dev.to/dynamic/image/width=90,height=90,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F972096%2Fe3c08211-25b9-401e-8ce6-5cee53d93c85.png',
            profile_image_url:
                'https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/972096/e3c08211-25b9-401e-8ce6-5cee53d93c85.png',
            'cached_base_subscriber?': false,
            cached_base_subscriber: false,
        },
        organization: {
            name: 'Apidog',
            username: 'apidog',
            slug: 'apidog',
            profile_image_90:
                'https://media2.dev.to/dynamic/image/width=90,height=90,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Forganization%2Fprofile_image%2F9521%2F4472c429-58e7-4c9a-abfb-eaa5aba9d747.jpeg',
            profile_image_url:
                'https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/9521/4472c429-58e7-4c9a-abfb-eaa5aba9d747.jpeg',
            'cached_base_subscriber?': false,
        },
        pinned: false,
        main_image:
            'https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F6z5xr0u5f6ee5bgsln0n.png',
        tag_list: ['webdev', 'tutorial', 'frontend', 'programming'],
        readable_publish_date: 'Dec 5',
        flare_tag: null,
        class_name: 'Article',
        cloudinary_video_url: null,
        published_at_int: 1733393088,
        published_timestamp: '2024-12-05T10:04:48Z',
        main_image_background_hex_color: '#dddddd',
        public_reaction_categories: [
            {
                slug: 'like',
                name: 'Like',
                icon: 'sparkle-heart',
                position: 1,
            },
            {
                slug: 'unicorn',
                name: 'Unicorn',
                icon: 'multi-unicorn',
                position: 2,
            },
            {
                slug: 'exploding_head',
                name: 'Exploding Head',
                icon: 'exploding-head',
                position: 3,
            },
            {
                slug: 'raised_hands',
                name: 'Raised Hands',
                icon: 'raised-hands',
                position: 4,
            },
            {
                slug: 'fire',
                name: 'Fire',
                icon: 'fire',
                position: 5,
            },
        ],
        body_preview: null,
        top_comments: [
            {
                comment_id: 1269393,
                user_id: 1946660,
                published_timestamp: '2024-12-07T02:33:20Z',
                published_at_int: 1733538800,
                safe_processed_html: '\u003cp\u003euseful\u003c/p\u003e\n\n',
                path: '/yiwei_yu_d1035b4c73ef274f/comment/2k5kl',
                username: 'yiwei_yu_d1035b4c73ef274f',
                name: 'Yiwei Yu',
                profile_image_90:
                    'https://media2.dev.to/dynamic/image/width=90,height=90,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F1946660%2F5c66268b-743c-4f64-9145-d2568b2132f3.png',
            },
            {
                comment_id: 1269108,
                user_id: 196189,
                published_timestamp: '2024-12-06T08:33:45Z',
                published_at_int: 1733474025,
                safe_processed_html:
                    '\u003cp\u003eAs alternative there is also \u003ca href="https://github.com/typicode/json-server/tree/v0" rel="nofollow noopener noreferrer" target="_blank"\u003egithub.com/typicode/json-server/tr...\u003c/a\u003e\u003c/p\u003e\n\n',
                path: '/oggo/comment/2k59m',
                username: 'oggo',
                name: 'oggo',
                profile_image_90:
                    'https://media2.dev.to/dynamic/image/width=90,height=90,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F196189%2F47bc9c25-841d-48a4-b884-dbb1a2233a6d.png',
            },
            {
                comment_id: 1269013,
                user_id: 1136795,
                published_timestamp: '2024-12-06T02:49:09Z',
                published_at_int: 1733453349,
                safe_processed_html: '\u003cp\u003eAwesome content!\u003c/p\u003e\n\n',
                path: '/ralphsebastian/comment/2k565',
                username: 'ralphsebastian',
                name: 'Ralph Sebastian',
                profile_image_90:
                    'https://media2.dev.to/dynamic/image/width=90,height=90,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F1136795%2F18afd9b2-e976-4fbc-bfde-8ccdde67c76c.png',
            },
        ],
    },
];

export { leftSidebarActions, profileDropdownActions, tempNews };

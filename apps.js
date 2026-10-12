// Everything the privacy policy and the deletion-request page know about each app lives here. Both
// pages render from it, so adding an app is adding an entry, and a change of processor is one edit.
//
// Text fields may contain inline HTML (links, <strong>); the pages insert them as such.

const UPDATED = '12 October 2026';
const AUTHOR = 'Zoltan Demant';
const PLAY = (id) => 'https://play.google.com/store/apps/details?id=' + id;

// A processor holds something on my behalf. `receives`/`why` go in the policy's table, `deletes`
// in the deletion page's table, and `fields` are what the user must supply so I can find their
// record. `{product}` is replaced with the app's paid product name.
const PROCESSORS = {
  revenuecat: {
    name: 'RevenueCat',
    policy: 'https://www.revenuecat.com/privacy',
    receives: 'Your purchase history and an anonymous, randomly generated identifier for your ' +
              'installation, together with the app version, Android version, device model and language ' +
              'of the request, and the IP address it comes from. No name, no email, no account.',
    why: 'To know whether you have paid for {product}, and to restore that purchase on a new device.',
    basis: 'Purchase data is processed to perform the contract you enter into when you buy {product}, ' +
           'and is retained while the purchase remains valid and for as long as tax and accounting ' +
           'rules require.',
    deletes: {
      what: 'Your purchase record — an anonymous identifier and the fact that a purchase was made or restored',
      who: 'RevenueCat, on my behalf',
      when: 'Deleted when you ask',
    },
    fields: [{
      key: 'order', label: 'Google Play order number',
      hint: 'Looks like GPA.1234-5678-9012-34567. Google emails it at the time of purchase, and it is ' +
            'listed under Payments & subscriptions in your Google account. Without it I cannot tell ' +
            'which purchase record is yours.',
    }],
    rights: 'the purchase record',
  },
  sentry: {
    name: 'Sentry',
    policy: 'https://sentry.io/privacy/',
    region: 'Sentry data is processed in the European Union.',
    receives: 'Crash and freeze reports: a stack trace, your device model, your Android version, and ' +
              'the {app} version. Personally identifiable information is switched off in the app\'s ' +
              'configuration, so no IP address, no device name, and nothing you have {made}.',
    why: 'To find out that the app broke, and where, so it can be fixed.',
    basis: 'Crash reports are processed under legitimate interest in keeping the app working, and are ' +
           'retained by Sentry for 90 days by default.',
    deletes: {
      what: 'Crash and freeze reports — a stack trace, device model, Android version, app version',
      who: 'Sentry, on my behalf, in the EU',
      when: 'Deleted automatically after 90 days, or sooner when you ask',
    },
    fields: [
      { key: 'device', label: 'Your device model', hint: 'For example "Pixel 8" or "Galaxy S24".' },
      { key: 'when', label: 'Roughly when it crashed', hint: 'A date, or "around mid-August". Reports ' +
        'carry no identifier that ties them to a person, so this is how I find the ones that are yours.' },
    ],
    rights: 'any crash reports',
  },
  crashlytics: {
    name: 'Firebase Crashlytics',
    policy: 'https://firebase.google.com/support/privacy',
    region: 'Crashlytics is run by Google, which may process its data in the United States and other ' +
            'countries.',
    receives: 'Crash reports, and reports of errors the app caught and recovered from: a stack trace, ' +
              'your device model, your Android version, the {app} version, and a random identifier ' +
              'Firebase creates for your installation. No name, no email, no account, and nothing you ' +
              'have {made}.',
    why: 'To find out that the app broke, and where, so it can be fixed.',
    basis: 'Crash reports are processed under legitimate interest in keeping the app working, and are ' +
           'retained by Crashlytics for 90 days.',
    deletes: {
      what: 'Crash and error reports — a stack trace, device model, Android version, app version and ' +
            'an installation identifier',
      who: 'Google, on my behalf',
      when: 'Deleted automatically after 90 days, or sooner when you ask',
    },
    fields: [
      { key: 'device', label: 'Your device model', hint: 'For example "Pixel 8" or "Galaxy S24".' },
      { key: 'when', label: 'Roughly when it crashed', hint: 'A date, or "around mid-August". Reports ' +
        'carry no identifier that ties them to a person, so this is how I find the ones that are yours.' },
    ],
    rights: 'any crash reports',
  },
};

const RECIPIENTS = {
  metno: {
    name: 'MET Norway',
    policy: 'https://www.met.no/en/About-us/privacy',
    receives: 'Your approximate location — latitude and longitude rounded to two decimals, roughly a ' +
              'kilometre — with each request for a forecast. Like any internet request, it also carries ' +
              'your IP address, and a header naming {app}, its version and my GitHub profile. No name, ' +
              'no email, no account, and nothing from your calendar or health data.',
    why: 'To get the weather forecast for where you are, for the rain, wind and frost cards.',
    basis: 'The rounded location is sent to MET Norway, the Norwegian Meteorological Institute, on the ' +
           'basis of your consent, which you give by allowing the location permission. The request goes ' +
           'from your phone to MET Norway directly; I receive nothing from it and keep no copy. How long ' +
           'MET Norway keeps its request logs is set by its own privacy policy and its ' +
           '<a href="https://api.met.no/doc/TermsOfService">terms of service</a>.',
    rights: 'Requests about the location sent to MET Norway go to MET Norway under ' +
            '<a href="https://www.met.no/en/About-us/privacy">its privacy policy</a>. It went there ' +
            'directly from your phone, so I hold no copy.',
    deletes: 'Your rounded location, as part of the requests {app} made for a forecast. It went from ' +
             'your phone straight to MET Norway; I never received it, hold no copy, and have no way to ' +
             'delete it. Ask MET Norway, under <a href="https://www.met.no/en/About-us/privacy">its ' +
             'privacy policy</a>.',
  },
};

const APPS = {
  ratio: {
    name: 'Ratio',
    id: 'app.ratio',
    is: 'an interval timer',
    thing: 'presets',          // plural: what the user creates
    made: 'built',             // past participle: what the user did to create it
    product: 'Pro',            // what Play sells inside the app
    processors: ['revenuecat', 'crashlytics'],
    lede: 'The timers you build stay on your device. Two things leave it — a record that you bought ' +
          'Pro, if you do, and a crash report, if the app breaks — and this policy explains both in full.',
    local: [
      'Your presets — the groups and intervals you build, their names, lengths, colours and repeat counts.',
      'The alert you give each interval — a vibration, a sound, both, or neither.',
      'Your settings, including the default alerts a new interval starts with.',
    ],
    sections: [{
      title: 'Android\'s own backup',
      body: 'Ratio allows Android to include its data in the device backup, if you have device backup ' +
            'switched on in your Android settings. That backup goes to your own Google account under ' +
            'Google\'s terms, not mine, and it is what restores your presets when you set up a new ' +
            'phone. You control it from Android\'s backup settings, and I never see it.',
    }],
    notDo: [
      'No analytics or usage tracking. I do not know which presets you run or how often.',
      'No location access, no contacts, no photos, no microphone, no health or sensor data.',
    ],
    permissions: [
      ['Internet', 'to check your Pro purchase and to send a crash report.'],
      ['Notifications', 'to show the running timer as an ongoing notification.'],
      ['Foreground service', 'so a timer you started keeps counting, and keeps signalling each ' +
        'interval, while the screen is off or you are in another app.'],
      ['Vibrate', 'to buzz when an interval ends, if you chose that alert.'],
      ['Keep the device awake', 'so the timer is not paused by the device sleeping mid-workout.'],
    ],
    // Deletion page: how to get rid of on-device data yourself.
    deleteLede: 'Almost everything Ratio holds is held by nobody but you, so almost none of it needs ' +
                'a request. This page is honest about which is which.',
    deleteLocal: [
      ['One preset', 'delete it in the app. It is gone immediately.'],
      ['Everything', 'uninstall Ratio. Android removes the app\'s data with it.'],
      ['The device backup', 'if Android backed Ratio up to your Google account, that copy is managed ' +
        'from your Google account\'s backup settings. I have no access to it.'],
    ],
  },
  tideline: {
    name: 'Tideline',
    id: 'com.tideline',
    is: 'a symptom diary',
    thing: 'check-ins',
    made: 'logged',
    product: 'the premium report',
    processors: ['revenuecat', 'sentry'],
    lede: 'The symptoms you log are the most sensitive thing this app holds, and they never leave ' +
          'your device. This policy explains that in full, and is honest about the two things that do ' +
          'leave it.',
    local: [
      'Your check-ins — what you logged, the date, the 1–10 severity, and any note you wrote.',
      'The check-in types you create, including their names and colors.',
      'Your settings, including your reminder time and week start.',
    ],
    sections: [{
      title: 'Backups you make yourself',
      body: 'Tideline can save a copy of everything you have logged to a file. That file is written ' +
            'wherever you choose to put it, and from that point it is in your hands — if you place it ' +
            'in a cloud folder, it goes to that cloud provider under their terms, not mine. Restoring ' +
            'reads a file back in and never deletes what is already there.',
    }, {
      title: 'The doctor\'s report',
      body: 'The report is generated on your device from your own check-ins and is shared only if and ' +
            'when you choose to share it. It is not uploaded anywhere.',
    }],
    notDo: [
      'No analytics or usage tracking. I do not know which screens you open or how often you log.',
      'No location access, no contacts, no photos, no microphone.',
    ],
    permissions: [
      ['Internet', 'to check your purchase and to send a crash report.'],
      ['Notifications', 'to show the daily reminder, if you switch it on.'],
      ['Run at startup', 'so a reminder you have set survives a restart.'],
    ],
    trailing: [{
      title: 'Not medical advice',
      body: 'Tideline records what you tell it. It does not diagnose, treat, or advise, and nothing in ' +
            'it is a substitute for a qualified clinician.',
    }],
    deleteLede: 'Most of what Tideline holds is not held by anyone but you, so most of it needs no ' +
                'request at all. This page is honest about which is which.',
    deleteLocal: [
      ['One entry', 'open it in the app and delete it. It is gone immediately.'],
      ['Everything', 'uninstall Tideline. Android removes the app\'s data with it.'],
      ['A backup file you made', 'that file is wherever you put it. Delete it the way you would ' +
        'delete any other file; I have no copy and no way to reach it.'],
    ],
  },
  glimt: {
    name: 'Glimt',
    id: 'app.glimt',
    is: 'a home-screen widget that shows one useful thing at a time',
    thing: 'readings and settings',
    made: 'saved',
    product: 'Pro',
    processors: ['revenuecat'],
    recipients: ['metno'],
    lede: 'Glimt reads your calendar, your approximate location and your Health Connect data to decide ' +
          'what the widget shows. All of it is read and kept on your device. Two things leave it — a ' +
          'rounded location, sent to a public weather service to get a forecast, and a record that you ' +
          'bought Pro, held by the service that handles the purchase — and this policy explains both in full.',
    localIntro: '<p>Glimt reads data that already lives on your device to choose what the widget shows. ' +
                'None of it is transmitted to me, and apart from the rounded location described under ' +
                '&ldquo;What does leave your device&rdquo;, none of it is transmitted to anyone else. ' +
                'Health Connect data is read only if you have bought Pro. Here is what it reads, and ' +
                'what it keeps:</p>',
    local: [
      'Calendar events — read live from your device\'s calendar each time the widget updates, for events ' +
        'from one hour ago to the end of tomorrow. The title, times, location and description are read; ' +
        'the location and description are used only to spot a Meet, Zoom or Teams link and a place name. ' +
        'Events are not copied into Glimt\'s own storage, but the title of an event the widget shows ' +
        'appears in the decision log below.',
      'Your next alarm — read from Android when the widget updates, to work out a bedtime. Not stored.',
      'Health Connect data — sleep sessions (start, end, time asleep), exercise sessions (start, end ' +
        'and a category such as run, walk or swim), resting heart rate and heart rate variability. These ' +
        'are copied from Health Connect into Glimt\'s own storage on your device for the last 15 days, ' +
        'so the widget can draw without asking Health Connect each time, and are replaced at each sync. ' +
        'Glimt only reads from Health Connect; it never writes to it.',
      'Your approximate location — latitude and longitude rounded to two decimals, roughly a kilometre ' +
        '— saved so the forecast can be refreshed without asking for your location each time.',
      'The weather forecast — hourly temperature, precipitation and gusts for the coming days, as ' +
        'received from MET Norway, with the time it was fetched. Replaced at each refresh.',
      'The decision log — for each widget update, the time, which card was shown and why, the headline ' +
        'and second line as displayed, and the cards that were considered. Those lines can contain what ' +
        'the card says: the title of a calendar event, how long you slept, a workout and its length, or ' +
        'your resting heart rate. When an update fails, a short technical description of the error is ' +
        'logged the same way. Entries older than 7 days are deleted, and the latest 50 are listed on ' +
        'Glimt\'s settings screen.',
      'Your settings — the gym keyword you type, if any, and which calendars you have switched off.',
      'Whether you have bought Pro — a yes or no, copied from the purchase service each time Glimt asks it, ' +
        'so the widget can work without a network connection.',
    ],
    localOutro: '<p>There is no account, no sign-up and no sync. I cannot see any of this, and there is no ' +
                'server of mine holding it. Glimt is excluded from Android\'s backup, so none of it is ' +
                'copied to your Google account.</p>',
    sections: [{
      title: 'Health Connect data',
      body: 'Glimt asks Health Connect for read access to sleep, exercise, resting heart rate and heart ' +
            'rate variability, and, if you allow it, to read in the background so the widget stays ' +
            'current without you opening the app. It uses that data for one purpose: to show you the ' +
            'sleep, workout and heart rate cards on your own widget. It stays on your device. It is not ' +
            'shared with anyone, not transferred off your device, not sold, not used for advertising, ' +
            'including interest-based advertising, not disclosed to data brokers, and not used to ' +
            'assess credit or for lending. Glimt\'s use of Health Connect data follows Google Play\'s ' +
            'User Data policy and its additional requirements for Health Connect. Reading Health Connect ' +
            'is part of Glimt Pro, a one-time purchase: until you have bought it Glimt does not ask for ' +
            'those permissions, and if the purchase is refunded or no longer valid Glimt stops reading ' +
            'Health Connect and deletes the readings it had copied.',
    }, {
      title: 'Location and weather',
      body: 'Glimt asks only for approximate location, never precise location, and never reads it in ' +
            'the background. It reads your position when you open the app, rounds it to two decimals ' +
            'and saves it. Roughly every 90 minutes while a widget is on your home screen, and when ' +
            'you open the app, Glimt asks MET Norway, the Norwegian Meteorological Institute, for the ' +
            'forecast at that saved position. The saved position, not a fresh reading, is what those ' +
            'in-between refreshes use.',
    }, {
      title: 'Buying Pro',
      body: 'Pro is a one-time purchase made through Google Play, and I never see the payment ' +
            'details. Glimt uses RevenueCat to check and restore it. Glimt starts RevenueCat only when you open ' +
            'its settings screen, and then asks it whether you have bought Pro and what it costs; it also ' +
            'contacts RevenueCat when you buy or restore. The widget and the background updates that keep ' +
            'it current do not start it. Glimt turns off RevenueCat\'s optional diagnostics and its collection ' +
            'of device identifiers, so no advertising identifier is read.',
    }, {
      title: 'Withdrawing access',
      body: 'Revoking a permission stops Glimt using that data, and Glimt then deletes what it had stored ' +
            'from it. Calendar events are read live, so reading stops at once. Stored sleep, workout or ' +
            'heart rate readings are deleted the next time Glimt syncs with Health Connect, which ' +
            'includes the next time you open it. The saved location and the cached forecast are deleted ' +
            'at the next weather refresh, within about 90 minutes while a widget is on your home screen ' +
            'and sooner when you open Glimt, and no more forecasts are requested. The exception is the ' +
            'decision log, which keeps past headlines for up to 7 days; clearing Glimt\'s storage or ' +
            'uninstalling it removes them at once — see ' +
            '<a href="../delete-data/?app=glimt">Requesting deletion of your data</a>.',
    }],
    notDo: [
      'No analytics, no usage tracking and no crash reporting. If the app breaks, a short technical ' +
        'note stays in the decision log on your device and is not sent anywhere.',
      'No contacts, no photos, no microphone, no camera, and no precise or background location.',
      'No Health Connect data is shared, transferred off your device, sold, or used for advertising.',
    ],
    permissions: [
      ['Internet and network state', 'to fetch the weather forecast from MET Norway, and to check, buy or ' +
        'restore Pro.'],
      ['Billing', 'to buy Pro through Google Play.'],
      ['Approximate location', 'to choose which forecast to ask for. Never precise, and never in the background.'],
      ['Read calendar', 'to show your next event and how busy your day is. Glimt cannot add, change or ' +
        'delete events.'],
      ['Read Health Connect sleep, exercise, resting heart rate and heart rate variability', 'to show last ' +
        'night\'s sleep, workouts and resting heart rate on the widget.'],
      ['Read Health Connect data in the background', 'so the widget stays current without you opening ' +
        'Glimt. Optional; without it, Glimt updates health data when you open it.'],
      ['Run at startup', 'so the widget is redrawn after the phone restarts.'],
    ],
    trailing: [{
      title: 'Not medical advice',
      body: 'Glimt shows figures it reads from Health Connect. It does not diagnose, treat, or advise, and ' +
            'nothing in it is a substitute for a qualified clinician.',
    }],
    rightsLocal: 'Nothing Glimt holds on your device needs a request: uninstalling it, or clearing its ' +
                 'storage in Android\'s settings, removes everything it stores. Only the purchase record at ' +
                 'RevenueCat can be deleted on request.',
    deleteLede: 'Glimt keeps what it reads on your device and sends none of it to me, so none of it needs a ' +
                'request. This page is honest about which is which: the purchase record at RevenueCat is ' +
                'the one thing I can delete on request, and the rounded location went to MET Norway.',
    deleteHeading: 'What Glimt holds — delete it yourself, right now',
    deleteIntro: 'Everything Glimt stores itself lives on your own device and is never sent to me. There ' +
                 'is no account and no server copy of it, so there is nothing for me to delete and no ' +
                 'request to make for this part.',
    deleteLocal: [
      ['Everything', 'uninstall Glimt. Android removes the app\'s data with it.'],
      ['Everything, keeping the app', 'in Android\'s settings open Apps, then Glimt, then Storage, and ' +
        'choose Clear storage. That removes the saved location, the forecast, the copied Health Connect ' +
        'readings, the decision log and your settings.'],
      ['The original data', 'Glimt only reads your calendar and Health Connect. Events and health ' +
        'records stay in those apps; delete them there. Revoking Glimt\'s permissions makes it ' +
        'delete what it copied from that data the next time it refreshes or syncs, apart from the ' +
        'decision log, which keeps up to 7 days of headlines. Clear its storage or uninstall it to ' +
        'remove everything at once.'],
    ],
  },
};

// Fill {app}, {product}, {made} in processor text for one app.
function fill(text, app) {
  return text.replace(/\{app\}/g, app.name).replace(/\{product\}/g, app.product).replace(/\{made\}/g, app.made);
}


// Words for a count: "One thing", "Two things", "Both".
const COUNT = ['No', 'One', 'Two', 'Three', 'Four'];

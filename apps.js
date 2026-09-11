// Everything the privacy policy and the deletion-request page know about each app lives here. Both
// pages render from it, so adding an app is adding an entry, and a change of processor is one edit.
//
// Text fields may contain inline HTML (links, <strong>); the pages insert them as such.

const UPDATED = '11 September 2026';
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
              'installation. No name, no email, no account.',
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
};

const APPS = {
  ratio: {
    name: 'Ratio',
    id: 'app.ratio',
    is: 'an interval timer',
    thing: 'presets',          // plural: what the user creates
    made: 'built',             // past participle: what the user did to create it
    product: 'Pro',            // what Play sells inside the app
    processors: ['revenuecat', 'sentry'],
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
};

// Fill {app}, {product}, {made} in processor text for one app.
function fill(text, app) {
  return text.replace(/\{app\}/g, app.name).replace(/\{product\}/g, app.product).replace(/\{made\}/g, app.made);
}


// Words for a count: "One thing", "Two things", "Both".
const COUNT = ['No', 'One', 'Two', 'Three', 'Four'];

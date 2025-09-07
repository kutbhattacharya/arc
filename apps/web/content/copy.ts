/**
 * Centralized copy management for Arc Marketing Intelligence
 * 
 * Tone: Creator-centric, fun, punchy, helpful
 * Voice: Confident but not cocky, data-driven but human
 */

export const copy = {
  // Landing Page
  hero: {
    headline: "Turn vibes into revenue.",
    subheadline: "Comments, trends, and spend decoded. Timing, hooks, and ROI recommended.",
    description: "The only marketing intelligence platform built for creators and SMBs who want to scale smart, not hard.",
    cta: {
      primary: "Start free",
      secondary: "See demo",
      tertiary: "Plug in my channels"
    }
  },

  // Navigation
  nav: {
    dashboard: "Dashboard",
    comments: "Comments",
    campaigns: "Campaigns", 
    trends: "Trends",
    recommendations: "Recommendations",
    planner: "Planner",
    settings: "Settings"
  },

  // Dashboard
  dashboard: {
    welcome: "Welcome back, creator",
    subtitle: "Here's what's happening with your content",
    helpers: {
      engagement: "Your last 5 posts are pulling weight on saves. Double down on that angle.",
      roas: "Google Ads is crushing it this week. Maybe time to reallocate some Meta budget?",
      timing: "Your crew is most active Tue 7–9pm. Prime time for drops.",
      sentiment: "Comments are 80% positive vibes. Your audience is here for it."
    },
    kpis: {
      roas: "12-Week ROAS",
      cac: "Customer Acquisition Cost",
      revenue: "Total Revenue",
      engagement: "Engagement Velocity"
    }
  },

  // Comments Explorer
  comments: {
    title: "Comments Explorer",
    subtitle: "Skim the signal. We clustered hot takes and love notes for you.",
    filters: {
      platform: "Platform",
      sentiment: "Sentiment", 
      timeRange: "Time Range",
      channel: "Channel",
      search: "Search comments..."
    },
    tips: {
      sentiment: "Dive into negative comments for product feedback gold.",
      topics: "These topic clusters show what really resonates.",
      timing: "Comments spike 2-4 hours after posting. Plan your responses."
    },
    empty: "Quiet for now. Drop a CSV or connect a channel to spark the magic."
  },

  // Campaigns
  campaigns: {
    title: "Campaigns",
    subtitle: "Track spend vs. ROI across all your marketing efforts",
    create: "New Campaign",
    edit: "Edit Campaign",
    attribution: {
      lastClick: "Last Click",
      linear: "Linear",
      timeDecay: "Time Decay",
      positionBased: "Position Based"
    },
    metrics: {
      spend: "Total Spend",
      revenue: "Revenue",
      roas: "ROAS",
      cac: "CAC",
      conversions: "Conversions"
    }
  },

  // Trends
  trends: {
    title: "Trends",
    subtitle: "Rising topics, content gaps, and prime posting windows",
    rising: "Rising Topics",
    declining: "Cooling Down",
    stable: "Steady Performers",
    postingTime: "Prime Time Heatmap",
    tips: {
      velocity: "Green = trending up. Red = cooling off. Yellow = steady as she goes.",
      timing: "Darker cells = higher engagement. Time your drops wisely.",
      gaps: "These topics are underserved. First-mover advantage awaits."
    }
  },

  // Recommendations  
  recommendations: {
    title: "Recommendations",
    subtitle: "AI-powered action cards to level up your game",
    scopes: {
      content: "Content",
      spend: "Spend",
      timing: "Timing", 
      trend: "Trending"
    },
    apply: "Apply",
    dismiss: "Dismiss",
    seeDetails: "See Details",
    helpers: {
      content: "Double down on what's working. These content angles are proven winners.",
      spend: "Your budget allocation isn't optimal. Here's how to fix it.",
      timing: "Timing is everything. Post when your audience is most engaged.",
      trend: "Catch the wave before everyone else does."
    }
  },

  // Planner
  planner: {
    title: "Content Planner",
    subtitle: "Drag-drop calendar with UTM helpers and prime time nudges",
    createPost: "New Post",
    schedule: "Schedule",
    utmBuilder: "UTM Builder",
    nudges: {
      primeTime: "Prime time: your crew is most active Tue 7–9pm.",
      trending: "AI ethics is trending +180%. Perfect timing for your next deep dive.",
      cadence: "You haven't posted in 4 days. Your audience is getting antsy."
    }
  },

  // Settings
  settings: {
    title: "Settings",
    subtitle: "Manage connections, workspace, and preferences",
    sections: {
      connections: "Connected Accounts",
      workspace: "Workspace",
      team: "Team Members",
      billing: "Billing",
      security: "Security"
    },
    connect: "Connect Account",
    disconnect: "Disconnect",
    invite: "Invite Member"
  },

  // Onboarding
  onboarding: {
    welcome: "Welcome to Arc",
    subtitle: "Let's connect your channels and get you set up",
    steps: {
      connect: "Connect Channels",
      upload: "Upload Data",
      setup: "Setup Complete"
    },
    connectors: {
      youtube: "Connect YouTube",
      instagram: "Connect Instagram", 
      googleAds: "Connect Google Ads",
      metaAds: "Connect Meta Ads",
      shopify: "Connect Shopify",
      stripe: "Connect Stripe"
    },
    fallbacks: {
      csv: "Or upload CSV files",
      manual: "Add manually"
    }
  },

  // Errors & Empty States
  errors: {
    generic: "We fumbled that fetch. Retrying with cooler hands…",
    auth: "Your session expired. Let's get you logged back in.",
    permission: "You don't have access to this workspace. Ask your admin for an invite.",
    notFound: "This page went on vacation. Let's get you back home.",
    rateLimit: "Whoa there, speedy. Give us a second to catch up.",
    network: "Internet's being flaky. We'll keep trying in the background."
  },

  emptyStates: {
    dashboard: "Your dashboard will light up once you connect some channels.",
    comments: "No comments yet. Connect a channel or upload a CSV to see the conversation.",
    campaigns: "No campaigns yet. Create your first one to start tracking ROI.",
    trends: "Trends will appear here once we analyze your data.",
    recommendations: "We're cooking up some recommendations. Check back in a few minutes.",
    planner: "Your content calendar is empty. Time to plan some fire content."
  },

  // Actions & CTAs
  actions: {
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    create: "Create",
    update: "Update",
    connect: "Connect",
    disconnect: "Disconnect",
    upload: "Upload",
    download: "Download",
    export: "Export",
    import: "Import",
    retry: "Try Again",
    refresh: "Refresh",
    viewDetails: "View Details",
    getStarted: "Get Started",
    learnMore: "Learn More"
  },

  // Status Messages
  status: {
    loading: "Loading...",
    saving: "Saving...",
    uploading: "Uploading...",
    processing: "Processing...",
    success: "Success!",
    error: "Something went wrong",
    connected: "Connected",
    disconnected: "Disconnected",
    syncing: "Syncing...",
    complete: "Complete"
  },

  // Help & Tooltips
  help: {
    roas: "Return on Ad Spend - Revenue divided by advertising cost",
    cac: "Customer Acquisition Cost - How much you spend to get one customer",
    engagement: "Likes, comments, shares per view over time",
    sentiment: "Positive, neutral, or negative vibes from comments",
    attribution: "How we assign credit for conversions across touchpoints",
    utm: "Tracking codes that help measure campaign performance"
  },

  // Keyboard Shortcuts
  shortcuts: {
    help: "Show keyboard shortcuts",
    dashboard: "Go to dashboard",
    comments: "Go to comments",
    recommendations: "Go to recommendations",
    search: "Search or run command",
    close: "Close"
  },

  // Command Palette
  command: {
    placeholder: "Search or run a command...",
    noResults: "No results found.",
    sections: {
      navigation: "Navigation",
      actions: "Actions",
      upload: "Upload Data",
      connect: "Connect Accounts"
    },
    commands: {
      dashboard: "Go to Dashboard",
      comments: "Go to Comments Explorer", 
      campaigns: "Go to Campaigns",
      trends: "Go to Trends",
      recommendations: "Go to Recommendations",
      planner: "Go to Content Planner",
      uploadComments: "Upload Comments CSV",
      uploadSpend: "Upload Spend Data",
      connectYoutube: "Connect YouTube",
      connectInstagram: "Connect Instagram",
      generateHooks: "Generate Content Hooks",
      exportData: "Export All Data"
    }
  }
} as const

export type CopyKeys = keyof typeof copy



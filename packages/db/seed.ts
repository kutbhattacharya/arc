import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create demo user
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@rust.app' },
    update: {},
    create: {
      email: 'demo@rust.app',
      name: 'Demo User',
    },
  })

  console.log('✅ Created demo user:', demoUser.email)

  // Create demo workspace
  const demoWorkspace = await prisma.workspace.upsert({
    where: { id: 'demo-workspace-1' },
    update: {},
    create: {
      id: 'demo-workspace-1',
      name: 'Rust Science Channel',
      ownerId: demoUser.id,
    },
  })

  // Add user as workspace member
  await prisma.workspaceMember.upsert({
    where: {
      workspaceId_userId: {
        workspaceId: demoWorkspace.id,
        userId: demoUser.id
      }
    },
    update: {},
    create: {
      workspaceId: demoWorkspace.id,
      userId: demoUser.id,
      role: 'OWNER'
    }
  })

  console.log('✅ Created demo workspace:', demoWorkspace.name)

  // Create account connections
  const connections = [
    {
      platform: 'YOUTUBE' as const,
      accessToken: 'demo-youtube-token',
      refreshToken: null,
      metaJson: { externalId: 'UC1234567890', name: 'Rust Science Channel' }
    },
    {
      platform: 'INSTAGRAM' as const,
      accessToken: 'demo-instagram-token',
      refreshToken: null,
      metaJson: { externalId: 'rust_science', name: '@rust_science' }
    },
    {
      platform: 'GOOGLE_ADS' as const,
      accessToken: 'demo-google-ads-token',
      refreshToken: 'demo-google-ads-refresh',
      metaJson: { externalId: '123-456-7890', name: 'Google Ads Account' }
    },
    {
      platform: 'META_ADS' as const,
      accessToken: 'demo-meta-ads-token',
      refreshToken: null,
      metaJson: { externalId: 'act_123456789', name: 'Meta Ads Account' }
    }
  ]

  for (const conn of connections) {
    await prisma.accountConnection.upsert({
      where: {
        workspaceId_platform: {
          workspaceId: demoWorkspace.id,
          platform: conn.platform
        }
      },
      update: {},
      create: {
        workspaceId: demoWorkspace.id,
        platform: conn.platform,
        accessToken: conn.accessToken,
        refreshToken: conn.refreshToken,
        metaJson: conn.metaJson
      }
    })
  }

  console.log('✅ Created account connections')

  // Create channels
  const channels = [
    {
      platform: 'YOUTUBE' as const,
      externalId: 'UC1234567890',
      handle: '@rustscience',
      displayName: 'Rust Science Channel',
      metaJson: {
        subscribers: 125000,
        totalViews: 2500000,
        avgViewDuration: 420
      }
    },
    {
      platform: 'INSTAGRAM' as const,
      externalId: 'rust_science',
      handle: '@rust_science',
      displayName: '@rust_science',
      metaJson: {
        followers: 45000,
        totalPosts: 320,
        avgEngagement: 8.5
      }
    }
  ]

  for (const channel of channels) {
    await prisma.channel.upsert({
      where: {
        workspaceId_platform_externalId: {
          workspaceId: demoWorkspace.id,
          platform: channel.platform,
          externalId: channel.externalId
        }
      },
      update: {},
      create: {
        workspaceId: demoWorkspace.id,
        platform: channel.platform,
        externalId: channel.externalId,
        handle: channel.handle,
        displayName: channel.displayName,
        metaJson: channel.metaJson
      }
    })
  }

  console.log('✅ Created channels')

  // Get channel IDs for content items
  const youtubeChannel = await prisma.channel.findFirst({
    where: { platform: 'YOUTUBE', workspaceId: demoWorkspace.id }
  })
  const instagramChannel = await prisma.channel.findFirst({
    where: { platform: 'INSTAGRAM', workspaceId: demoWorkspace.id }
  })

  if (!youtubeChannel || !instagramChannel) {
    throw new Error('Channels not found')
  }

  // Create content items
  const contentItems = [
    {
      channelId: youtubeChannel.id,
      platform: 'YOUTUBE' as const,
      externalId: 'video_1',
      title: 'The Physics of Black Holes Explained',
      publishedAt: new Date('2024-01-15T14:30:00Z'),
      metricsJson: {
        views: 1250000,
        likes: 45000,
        comments: 2500,
        shares: 1200,
        watchTime: 525000000
      }
    },
    {
      channelId: youtubeChannel.id,
      platform: 'YOUTUBE' as const,
      externalId: 'video_2',
      title: 'Why Quantum Computing Will Change Everything',
      publishedAt: new Date('2024-01-08T16:45:00Z'),
      metricsJson: {
        views: 980000,
        likes: 38000,
        comments: 1800,
        shares: 950,
        watchTime: 411600000
      }
    },
    {
      channelId: instagramChannel.id,
      platform: 'INSTAGRAM' as const,
      externalId: 'post_1',
      title: 'Just finished filming our latest science explainer! ✨',
      publishedAt: new Date('2024-01-20T12:00:00Z'),
      metricsJson: {
        likes: 1250,
        comments: 45,
        shares: 12,
        saves: 89
      }
    },
    {
      channelId: instagramChannel.id,
      platform: 'INSTAGRAM' as const,
      externalId: 'post_2',
      title: 'Behind the scenes of our quantum computing episode 📱',
      publishedAt: new Date('2024-01-18T15:30:00Z'),
      metricsJson: {
        likes: 980,
        comments: 32,
        shares: 8,
        saves: 67
      }
    }
  ]

  for (const item of contentItems) {
    await prisma.contentItem.upsert({
      where: {
        channelId_platform_externalId: {
          channelId: item.channelId,
          platform: item.platform,
          externalId: item.externalId
        }
      },
      update: {},
      create: {
        channelId: item.channelId,
        platform: item.platform,
        externalId: item.externalId,
        title: item.title,
        publishedAt: item.publishedAt,
        metricsJson: item.metricsJson
      }
    })
  }

  console.log('✅ Created content items')

  // Get content item IDs for comments
  const video1 = await prisma.contentItem.findFirst({
    where: { externalId: 'video_1' }
  })
  const video2 = await prisma.contentItem.findFirst({
    where: { externalId: 'video_2' }
  })
  const post1 = await prisma.contentItem.findFirst({
    where: { externalId: 'post_1' }
  })
  const post2 = await prisma.contentItem.findFirst({
    where: { externalId: 'post_2' }
  })

  if (!video1 || !video2 || !post1 || !post2) {
    throw new Error('Content items not found')
  }

  // Create comments
  const comments = [
    {
      contentItemId: video1.id,
      platform: 'YOUTUBE' as const,
      externalId: 'comment_1',
      author: 'ScienceFan123',
      text: 'This is absolutely brilliant! Love the way you explain complex concepts. The visualizations are top-notch.',
      publishedAt: new Date('2024-01-15T15:00:00Z'),
      likeCount: 45,
      sentiment: 'POS' as const,
      topicTags: ['physics', 'education', 'visualization']
    },
    {
      contentItemId: video1.id,
      platform: 'YOUTUBE' as const,
      externalId: 'comment_2',
      author: 'QuantumEnthusiast',
      text: 'Finally someone who gets it right. Can\'t wait for the next video! This channel is a gem.',
      publishedAt: new Date('2024-01-15T16:30:00Z'),
      likeCount: 32,
      sentiment: 'POS' as const,
      topicTags: ['quantum', 'technology', 'appreciation']
    },
    {
      contentItemId: video2.id,
      platform: 'YOUTUBE' as const,
      externalId: 'comment_3',
      author: 'SkepticUser',
      text: 'I think you\'re oversimplifying this. The math behind quantum entanglement is much more complex.',
      publishedAt: new Date('2024-01-08T18:00:00Z'),
      likeCount: 8,
      sentiment: 'NEG' as const,
      topicTags: ['criticism', 'complexity', 'mathematics']
    },
    {
      contentItemId: post1.id,
      platform: 'INSTAGRAM' as const,
      externalId: 'comment_4',
      author: 'science_lover',
      text: 'Amazing content as always! 🔥',
      publishedAt: new Date('2024-01-20T12:30:00Z'),
      likeCount: 12,
      sentiment: 'POS' as const,
      topicTags: ['science', 'content', 'appreciation']
    },
    {
      contentItemId: post2.id,
      platform: 'INSTAGRAM' as const,
      externalId: 'comment_5',
      author: 'curious_mind',
      text: 'When is the next video coming out?',
      publishedAt: new Date('2024-01-18T16:00:00Z'),
      likeCount: 5,
      sentiment: 'NEU' as const,
      topicTags: ['question', 'timing', 'expectation']
    }
  ]

  for (const comment of comments) {
    await prisma.comment.upsert({
      where: {
        contentItemId_platform_externalId: {
          contentItemId: comment.contentItemId,
          platform: comment.platform,
          externalId: comment.externalId
        }
      },
      update: {},
      create: {
        contentItemId: comment.contentItemId,
        platform: comment.platform,
        externalId: comment.externalId,
        author: comment.author,
        text: comment.text,
        publishedAt: comment.publishedAt,
        likeCount: comment.likeCount,
        sentiment: comment.sentiment,
        topicTags: comment.topicTags
      }
    })
  }

  console.log('✅ Created comments')

  // Create campaigns
  const campaigns = [
    {
      id: 'campaign_1',
      name: 'Q4 Science Push',
      objective: 'Drive awareness and engagement',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-03-31'),
      channelsJson: ['YOUTUBE', 'INSTAGRAM'],
      budgetsJson: { daily: 100, total: 5000 },
      utmJson: { source: 'google_ads', medium: 'cpc', campaign: 'q4_science' }
    },
    {
      id: 'campaign_2',
      name: 'Quantum Computing Awareness',
      objective: 'Educate about quantum computing',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-04-15'),
      channelsJson: ['INSTAGRAM', 'META_ADS'],
      budgetsJson: { daily: 75, total: 3000 },
      utmJson: { source: 'meta_ads', medium: 'cpc', campaign: 'quantum_awareness' }
    },
    {
      id: 'campaign_3',
      name: 'Physics Education Series',
      objective: 'Educational content promotion',
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-05-01'),
      channelsJson: ['YOUTUBE'],
      budgetsJson: { daily: 50, total: 2000 },
      utmJson: { source: 'youtube_ads', medium: 'video', campaign: 'physics_education' }
    }
  ]

  for (const campaign of campaigns) {
    await prisma.campaign.upsert({
      where: { id: campaign.id },
      update: {},
      create: {
        id: campaign.id,
        workspaceId: demoWorkspace.id,
        name: campaign.name,
        objective: campaign.objective,
        startDate: campaign.startDate,
        endDate: campaign.endDate,
        channelsJson: campaign.channelsJson,
        budgetsJson: campaign.budgetsJson,
        utmJson: campaign.utmJson
      }
    })
  }

  console.log('✅ Created campaigns')

  // Create spend data
  const spendData = [
    // Google Ads spend
    { campaignId: 'campaign_1', platform: 'GOOGLE_ADS' as const, date: new Date('2024-01-15'), spend: 1250.50, impressions: 45000, clicks: 1200, conversions: 45, revenue: 3200.75 },
    { campaignId: 'campaign_1', platform: 'GOOGLE_ADS' as const, date: new Date('2024-01-16'), spend: 980.25, impressions: 38000, clicks: 950, conversions: 38, revenue: 2850.50 },
    { campaignId: 'campaign_1', platform: 'GOOGLE_ADS' as const, date: new Date('2024-01-17'), spend: 1100.75, impressions: 42000, clicks: 1100, conversions: 42, revenue: 2950.25 },
    
    // Meta Ads spend
    { campaignId: 'campaign_2', platform: 'META_ADS' as const, date: new Date('2024-01-15'), spend: 850.25, impressions: 65000, clicks: 1800, conversions: 28, revenue: 1950.50 },
    { campaignId: 'campaign_2', platform: 'META_ADS' as const, date: new Date('2024-01-16'), spend: 720.75, impressions: 58000, clicks: 1650, conversions: 25, revenue: 1725.25 },
    { campaignId: 'campaign_2', platform: 'META_ADS' as const, date: new Date('2024-01-17'), spend: 920.50, impressions: 72000, clicks: 1950, conversions: 32, revenue: 2100.75 },
    
    // YouTube Ads spend
    { campaignId: 'campaign_3', platform: 'YOUTUBE' as const, date: new Date('2024-02-01'), spend: 400.00, impressions: 15000, clicks: 600, conversions: 24, revenue: 1440.00 },
    { campaignId: 'campaign_3', platform: 'YOUTUBE' as const, date: new Date('2024-02-02'), spend: 350.00, impressions: 13000, clicks: 520, conversions: 21, revenue: 1260.00 },
    { campaignId: 'campaign_3', platform: 'YOUTUBE' as const, date: new Date('2024-02-03'), spend: 450.00, impressions: 17000, clicks: 680, conversions: 27, revenue: 1620.00 }
  ]

  for (const spend of spendData) {
    await prisma.spend.upsert({
      where: {
        campaignId_platform_date: {
          campaignId: spend.campaignId,
          platform: spend.platform,
          date: spend.date
        }
      },
      update: {},
      create: {
        campaignId: spend.campaignId,
        platform: spend.platform,
        date: spend.date,
        spend: spend.spend,
        impressions: spend.impressions,
        clicks: spend.clicks,
        conversions: spend.conversions,
        revenue: spend.revenue,
        metaJson: {
          ctr: (spend.clicks / spend.impressions * 100).toFixed(2),
          cpc: (spend.spend / spend.clicks).toFixed(2),
          cpm: (spend.spend / spend.impressions * 1000).toFixed(2),
          roas: (spend.revenue / spend.spend).toFixed(2)
        }
      }
    })
  }

  console.log('✅ Created spend data')

  // Create ROI views
  const roiViews = [
    {
      campaignId: 'campaign_1',
      period: 'daily',
      spend: 3331.50,
      revenue: 9001.50,
      cac: 26.67,
      roas: 2.70,
      clv: 13502.25,
      attributionModel: 'LAST_CLICK' as const
    },
    {
      campaignId: 'campaign_2',
      period: 'daily',
      spend: 2491.50,
      revenue: 5776.50,
      cac: 28.33,
      roas: 2.32,
      clv: 7509.45,
      attributionModel: 'LAST_CLICK' as const
    },
    {
      campaignId: 'campaign_3',
      period: 'daily',
      spend: 1200.00,
      revenue: 4320.00,
      cac: 16.67,
      roas: 3.60,
      clv: 6480.00,
      attributionModel: 'LAST_CLICK' as const
    }
  ]

  for (const roi of roiViews) {
    await prisma.rOIView.upsert({
      where: {
        campaignId_period_attributionModel: {
          campaignId: roi.campaignId,
          period: roi.period,
          attributionModel: roi.attributionModel
        }
      },
      update: {},
      create: {
        campaignId: roi.campaignId,
        period: roi.period,
        spend: roi.spend,
        revenue: roi.revenue,
        cac: roi.cac,
        roas: roi.roas,
        clv: roi.clv,
        attributionModel: roi.attributionModel
      }
    })
  }

  console.log('✅ Created ROI views')

  // Create trends
  const trends = [
    {
      platform: 'YOUTUBE' as const,
      tag: 'AI ethics',
      score: 92.5,
      velocity: 180.0,
      periodStart: new Date('2024-01-10'),
      periodEnd: new Date('2024-01-17'),
      metaJson: { sentiment: 'POSITIVE', mentionCount: 45 }
    },
    {
      platform: 'YOUTUBE' as const,
      tag: 'quantum computing',
      score: 87.2,
      velocity: 95.0,
      periodStart: new Date('2024-01-10'),
      periodEnd: new Date('2024-01-17'),
      metaJson: { sentiment: 'POSITIVE', mentionCount: 32 }
    },
    {
      platform: 'INSTAGRAM' as const,
      tag: 'climate tech',
      score: 78.9,
      velocity: 45.0,
      periodStart: new Date('2024-01-10'),
      periodEnd: new Date('2024-01-17'),
      metaJson: { sentiment: 'POSITIVE', mentionCount: 28 }
    },
    {
      platform: 'YOUTUBE' as const,
      tag: 'physics education',
      score: 75.3,
      velocity: 38.0,
      periodStart: new Date('2024-01-10'),
      periodEnd: new Date('2024-01-17'),
      metaJson: { sentiment: 'POSITIVE', mentionCount: 22 }
    }
  ]

  for (const trend of trends) {
    await prisma.trend.create({
      data: {
        workspaceId: demoWorkspace.id,
        platform: trend.platform,
        tag: trend.tag,
        score: trend.score,
        velocity: trend.velocity,
        periodStart: trend.periodStart,
        periodEnd: trend.periodEnd,
        metaJson: trend.metaJson
      }
    })
  }

  console.log('✅ Created trends')

  // Create recommendations
  const recommendations = [
    {
      scope: 'CONTENT' as const,
      title: 'Double down on quantum physics content',
      body: 'Your quantum computing videos have 40% higher engagement than average. Consider creating a quantum physics series.',
      rationaleJson: {
        reason: 'High engagement rates and trending topic',
        metrics: { avg_engagement: 8.5, trend_score: 92 },
        features: ['engagement_velocity', 'topic_trend_score', 'audience_retention']
      },
      actionJson: {
        type: 'content_creation',
        priority: 'high',
        timeline: '7 days',
        steps: ['Research trending quantum topics', 'Script 3-part series', 'Schedule production']
      }
    },
    {
      scope: 'TIMING' as const,
      title: 'Optimize posting schedule for maximum reach',
      body: 'Your audience is most active Tuesday 7-9pm EST. Scheduling posts during this window could increase initial velocity by 25%.',
      rationaleJson: {
        reason: 'Peak audience activity window identified',
        metrics: { peak_engagement: '7-9pm EST', velocity_increase: 25 },
        features: ['audience_activity_patterns', 'historical_performance', 'timezone_analysis']
      },
      actionJson: {
        type: 'scheduling_optimization',
        priority: 'medium',
        timeline: '3 days',
        steps: ['Update content calendar', 'Set automated posting', 'Monitor initial performance']
      }
    },
    {
      scope: 'SPEND' as const,
      title: 'Reduce Meta Ads budget by 15%',
      body: 'Google Ads is delivering 2.3x better ROAS. Reallocate $1,500 from Meta to Google Ads for better returns.',
      rationaleJson: {
        reason: 'Significant ROAS difference between platforms',
        metrics: { google_roas: 3.2, meta_roas: 1.4, suggested_reallocation: 1500 },
        features: ['platform_roas_comparison', 'conversion_attribution', 'budget_efficiency']
      },
      actionJson: {
        type: 'budget_reallocation',
        priority: 'high',
        timeline: '1 day',
        steps: ['Reduce Meta daily budget', 'Increase Google Ads budget', 'Monitor performance shift']
      }
    }
  ]

  for (const rec of recommendations) {
    await prisma.recommendation.create({
      data: {
        workspaceId: demoWorkspace.id,
        scope: rec.scope,
        title: rec.title,
        body: rec.body,
        rationaleJson: rec.rationaleJson,
        actionJson: rec.actionJson
      }
    })
  }

  console.log('✅ Created recommendations')

  // Create job runs
  const jobRuns = [
    {
      type: 'YOUTUBE_INGEST',
      status: 'COMPLETED' as const,
      startedAt: new Date('2024-01-17T10:00:00Z'),
      finishedAt: new Date('2024-01-17T10:05:00Z'),
      payloadJson: { channelId: 'UC1234567890', videosProcessed: 2, commentsProcessed: 3 }
    },
    {
      type: 'INSTAGRAM_INGEST',
      status: 'COMPLETED' as const,
      startedAt: new Date('2024-01-17T10:10:00Z'),
      finishedAt: new Date('2024-01-17T10:12:00Z'),
      payloadJson: { accountId: 'rust_science', postsProcessed: 2, commentsProcessed: 2 }
    },
    {
      type: 'GOOGLE_ADS_INGEST',
      status: 'COMPLETED' as const,
      startedAt: new Date('2024-01-17T10:15:00Z'),
      finishedAt: new Date('2024-01-17T10:17:00Z'),
      payloadJson: { campaignId: 'campaign_1', spendRecords: 3, roasCalculated: true }
    },
    {
      type: 'META_ADS_INGEST',
      status: 'COMPLETED' as const,
      startedAt: new Date('2024-01-17T10:20:00Z'),
      finishedAt: new Date('2024-01-17T10:22:00Z'),
      payloadJson: { campaignId: 'campaign_2', spendRecords: 3, roasCalculated: true }
    }
  ]

  for (const job of jobRuns) {
    await prisma.jobRun.create({
      data: {
        type: job.type,
        status: job.status,
        startedAt: job.startedAt,
        finishedAt: job.finishedAt,
        payloadJson: job.payloadJson
      }
    })
  }

  console.log('✅ Created job runs')

  console.log('🎉 Database seed completed successfully!')
  console.log('')
  console.log('Demo Account:')
  console.log('  Email: demo@rust.app')
  console.log('  Password: (Use OAuth or create account)')
  console.log('')
  console.log('Demo Data Created:')
  console.log('  - 1 Workspace: Rust Science Channel')
  console.log('  - 4 Account Connections (YouTube, Instagram, Google Ads, Meta Ads)')
  console.log('  - 2 Channels (YouTube, Instagram)')
  console.log('  - 4 Content Items (2 YouTube videos, 2 Instagram posts)')
  console.log('  - 5 Comments with sentiment analysis')
  console.log('  - 3 Campaigns across different platforms')
  console.log('  - 9 Spend records with ROAS calculations')
  console.log('  - 3 ROI views with attribution models')
  console.log('  - 4 Trending topics with velocity scores')
  console.log('  - 3 AI recommendations with confidence scores')
  console.log('  - 4 Job runs showing data ingestion history')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
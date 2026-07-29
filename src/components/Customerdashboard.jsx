import React, { useState } from 'react';

const CustomerDashboard = () => {
  const [walletBalance, setWalletBalance] = useState(3450);
  const [autoTopup, setAutoTopup] = useState(true);
  const [creditUsed, setCreditUsed] = useState(5000);
  const [subscriptionActive, setSubscriptionActive] = useState(true);
  const [showTopupForm, setShowTopupForm] = useState(false);
  const [topupAmount, setTopupAmount] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const creditLimit = 15000;
  const weeklyPrice = 2400;
  const creditPercentage = (creditUsed / creditLimit) * 100;

  const [orders, setOrders] = useState([
    { id: '#4790', item: 'Weekly box', amount: 2400, status: 'green', statusText: 'Delivered' },
    { id: '#4805', item: 'Weekly box', amount: 2400, status: 'green', statusText: 'Delivered' },
    { id: '#4821', item: 'Weekly box', amount: 2400, status: 'amber', statusText: 'Credit hold' },
    { id: '#4834', item: 'Add-on: eggs', amount: 450, status: 'red', statusText: 'Payment due' }
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
    { type: 'card', name: '💳 Visa •••• 4821', status: 'Default', isDefault: true },
    { type: 'bank', name: '🏦 Bank transfer', status: 'Linked', isDefault: false },
    { type: 'cod', name: '💵 Cash on delivery', status: 'Available', isDefault: false }
  ]);

  const handleTopup = () => {
    if (topupAmount && !isNaN(topupAmount)) {
      setWalletBalance(walletBalance + parseInt(topupAmount));
      setTopupAmount('');
      setShowTopupForm(false);
      alert(`✅ Topup successful! Added PKR ${topupAmount}`);
    }
  };

  const handleSkipDelivery = () => {
    alert('✅ Next delivery skipped!');
  };

  const handlePauseSubscription = () => {
    setSubscriptionActive(false);
    alert('⏸️ Subscription paused. You can resume anytime.');
  };

  const handleResumeSubscription = () => {
    setSubscriptionActive(true);
    alert('▶️ Subscription resumed!');
  };

  const handleChangeplan = () => {
    alert('📋 Redirecting to change plan...');
  };

  const handleCancelSubscription = () => {
    if (window.confirm('Are you sure you want to cancel? Your subscription will end on the next billing date.')) {
      setSubscriptionActive(false);
      alert('❌ Subscription cancelled');
    }
  };

  const handlePayNow = () => {
    alert('💳 Redirecting to payment gateway...');
  };

  const handleAddPaymentMethod = () => {
    alert('➕ Add new payment method');
  };

  const handleSetDefault = (method) => {
    setPaymentMethods(paymentMethods.map(m => ({
      ...m,
      isDefault: m.type === method.type
    })));
    alert(`✅ ${method.name} set as default payment method`);
  };

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={styles.brand}>
          <div style={styles.brandMark}>L</div>
          <div>
            <div style={styles.brandName}>Ledger Pro</div>
            <div style={styles.brandSub}>Wallet & credit platform</div>
          </div>
        </div>

        <div style={styles.userCard}>
          <div style={styles.avatar}></div>
          <div>
            <div style={styles.userName}>Sarah Malik</div>
            <div style={styles.userRole}>Customer</div>
          </div>
        </div>

        <div style={styles.navGroupLabel}>My account</div>
        <nav style={styles.nav}>
          <a href="#" style={{ ...styles.navLink, ...styles.navLinkActive }}>
            📊 Dashboard
          </a>
          <a href="#" style={styles.navLink}>📦 My orders</a>
          <a href="#" style={styles.navLink}>📫 Subscription</a>
          <a href="#" style={styles.navLink}>💰 Wallet</a>
          <a href="#" style={styles.navLink}>📄 Invoices</a>
          <a href="#" style={styles.navLink}>🚚 Delivery calendar</a>
        </nav>

        <div style={styles.helpCard}>
          <div style={{ ...styles.avatar, width: '30px', height: '30px', background: 'linear-gradient(135deg, #3FCB84, #1E8A55)' }}></div>
          <div>
            <div style={styles.helpTitle}>Need help?</div>
            <div style={styles.helpSub}>Contact support</div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={styles.main}>
        {/* TOPBAR */}
        <div style={styles.topbar}>
          <div>
            <h1 style={styles.heading}>
              My Dashboard <span style={styles.badgeTag}>CUSTOMER</span>
            </h1>
            <div style={styles.subText}>Welcome back, Sarah — here's where your account stands.</div>
          </div>
          <button 
            style={styles.bellButton}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            🔔
            <div style={styles.notificationDot}></div>
          </button>
        </div>

        {/* ALERT BANNER */}
        <div style={styles.alertBanner}>
          <div style={styles.alertLeft}>
            ⚠️ You have <b>1 unpaid invoice — PKR 20.00</b> due to release order #4834.
          </div>
          <button style={{ ...styles.btn, ...styles.btnPrimary }} onClick={handlePayNow}>
            Pay now
          </button>
        </div>

        {/* KPI CARDS */}
        <div style={styles.row2}>
          {/* WALLET BALANCE */}
          <div style={styles.panel}>
            <div style={{ ...styles.kpiIcon, background: 'rgba(63, 203, 132, 0.14)' }}>
              💰
            </div>
            <div style={styles.kpiLabel}>Wallet balance</div>
            <div style={styles.kpiValue}>PKR {walletBalance.toLocaleString()}</div>
            <div style={styles.buttonGroup}>
              <button 
                style={{ ...styles.btn, ...styles.btnPrimary }}
                onClick={() => setShowTopupForm(!showTopupForm)}
              >
                ➕ Top up
              </button>
              <button 
                style={styles.btn}
                onClick={() => setAutoTopup(!autoTopup)}
              >
                Auto-topup: {autoTopup ? 'On' : 'Off'}
              </button>
            </div>

            {showTopupForm && (
              <div style={styles.topupForm}>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={topupAmount}
                  onChange={(e) => setTopupAmount(e.target.value)}
                  style={styles.input}
                />
                <button 
                  style={{ ...styles.btn, ...styles.btnPrimary, marginTop: '8px' }}
                  onClick={handleTopup}
                >
                  Confirm Topup
                </button>
              </div>
            )}
          </div>

          {/* CREDIT USAGE */}
          <div style={styles.panel}>
            <div style={{ ...styles.kpiIcon, background: 'rgba(79, 168, 247, 0.14)' }}>
              💳
            </div>
            <div style={styles.kpiLabel}>Credit usage</div>
            <div style={styles.kpiValue}>
              {creditUsed.toLocaleString()} 
              <span style={{ fontSize: '14px', color: '#8A90A3' }}>/ {creditLimit.toLocaleString()}</span>
            </div>
            <div style={styles.barTrack}>
              <div style={{ ...styles.barFill, width: `${creditPercentage}%` }}></div>
            </div>
            <div style={styles.barCaption}>
              <span>{creditPercentage.toFixed(0)}% used</span>
              <span>PKR {(creditLimit - creditUsed).toLocaleString()} available</span>
            </div>
          </div>
        </div>

        {/* SUBSCRIPTION CARD */}
        <div style={{ ...styles.panel, marginBottom: '14px' }}>
          <div style={styles.panelHead}>
            <div>
              <div style={styles.panelTitle}>Weekly Essentials Box</div>
              <div style={styles.panelSub}>
                PKR {weeklyPrice.toLocaleString()} / week · Next billing Thu, Jul 30
              </div>
            </div>
            <div style={styles.subStatus}>
              <div style={styles.statusDot}></div>
              <span style={{ ...styles.statusPill, ...styles.statusPillGreen }}>
                {subscriptionActive ? 'Active' : 'Paused'}
              </span>
            </div>
          </div>

          <div style={styles.subActions}>
            <button style={styles.btn} onClick={handleSkipDelivery}>
              ⏭️ Skip next delivery
            </button>
            <button 
              style={styles.btn} 
              onClick={subscriptionActive ? handlePauseSubscription : handleResumeSubscription}
            >
              {subscriptionActive ? '⏸️ Pause subscription' : '▶️ Resume subscription'}
            </button>
            <button style={styles.btn} onClick={handleChangeplan}>
              📋 Change plan
            </button>
            <button 
              style={{ ...styles.btn, color: '#F1584E' }}
              onClick={handleCancelSubscription}
            >
              ✕ Cancel
            </button>
          </div>

          {/* TIMELINE */}
          <div style={styles.timeline}>
            <div style={{ ...styles.tStop, ...styles.tStopDone }}>
              <div style={styles.tDot}>✓</div>
              <span>Order placed</span>
            </div>
            <div style={{ ...styles.tStop, ...styles.tStopDone }}>
              <div style={styles.tDot}>✓</div>
              <span>Invoice paid</span>
            </div>
            <div style={{ ...styles.tStop, ...styles.tStopActive }}>
              <div style={styles.tDot}></div>
              <span>Out for delivery</span>
            </div>
            <div style={styles.tStop}>
              <div style={styles.tDot}></div>
              <span>Delivered</span>
            </div>
          </div>
        </div>

        {/* ORDERS & PAYMENTS */}
        <div style={styles.row2}>
          {/* RECENT ORDERS */}
          <div style={styles.panel}>
            <div style={styles.panelHead}>
              <div style={styles.panelTitle}>Recent orders</div>
              <a href="#" style={styles.link}>View all →</a>
            </div>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Item</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr key={idx}>
                    <td style={styles.monospace}>{order.id}</td>
                    <td>{order.item}</td>
                    <td style={styles.monospace}>{order.amount.toLocaleString()}</td>
                    <td>
                      <span style={{
                        ...styles.statusPill,
                        ...(order.status === 'green' && styles.statusPillGreen),
                        ...(order.status === 'amber' && styles.statusPillAmber),
                        ...(order.status === 'red' && styles.statusPillRed)
                      }}>
                        {order.statusText}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAYMENT METHODS */}
          <div style={styles.panel}>
            <div style={styles.panelHead}>
              <div style={styles.panelTitle}>Payment methods</div>
              <a href="#" style={styles.link}>Manage →</a>
            </div>
            {paymentMethods.map((method, idx) => (
              <div key={idx} style={styles.methodRow}>
                <span>{method.name}</span>
                <button
                  style={styles.statusBadge}
                  onClick={() => handleSetDefault(method)}
                  title={method.isDefault ? 'This is your default method' : 'Click to set as default'}
                >
                  {method.isDefault ? '⭐ Default' : method.status}
                </button>
              </div>
            ))}
            <button 
              style={{ ...styles.btn, width: '100%', marginTop: '10px' }}
              onClick={handleAddPaymentMethod}
            >
              ➕ Add payment method
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    background: '#0A0D13',
    color: '#EDEFF4',
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: '14px'
  },
  sidebar: {
    width: '220px',
    flexShrink: 0,
    background: '#0D1017',
    borderRight: '1px solid rgba(255,255,255,0.07)',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 14px',
    maxHeight: '100vh',
    overflowY: 'auto'
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '6px 8px 18px'
  },
  brandMark: {
    width: '32px',
    height: '32px',
    borderRadius: '9px',
    background: 'linear-gradient(135deg, #8C7CFF, #5B4CD6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '15px',
    color: '#fff'
  },
  brandName: {
    fontSize: '15px',
    fontWeight: '600'
  },
  brandSub: {
    fontSize: '10.5px',
    color: '#5C6377'
  },
  userCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: '#12151F',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '12px',
    padding: '10px',
    marginBottom: '18px'
  },
  avatar: {
    width: '34px',
    height: '34px',
    borderRadius: '9px',
    background: 'linear-gradient(135deg, #4FA8F7, #2C6FBA)',
    flexShrink: 0
  },
  userName: {
    fontSize: '13px',
    fontWeight: '600'
  },
  userRole: {
    fontSize: '11px',
    color: '#4FA8F7'
  },
  navGroupLabel: {
    fontSize: '10px',
    letterSpacing: '0.09em',
    color: '#5C6377',
    padding: '14px 10px 6px',
    textTransform: 'uppercase'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column'
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 10px',
    borderRadius: '8px',
    fontSize: '13px',
    color: '#8A90A3',
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    textDecoration: 'none',
    textAlign: 'left'
  },
  navLinkActive: {
    background: 'rgba(140, 124, 255, 0.14)',
    color: '#EDEFF4'
  },
  helpCard: {
    marginTop: 'auto',
    background: '#12151F',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '12px',
    padding: '12px',
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
  },
  helpTitle: {
    fontSize: '12px',
    fontWeight: '600'
  },
  helpSub: {
    fontSize: '10.5px',
    color: '#5C6377'
  },
  main: {
    flex: 1,
    minWidth: 0,
    padding: '22px 28px 50px',
    overflowY: 'auto'
  },
  topbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
    gap: '20px'
  },
  heading: {
    fontSize: '19px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '9px',
    margin: 0
  },
  badgeTag: {
    fontSize: '10px',
    fontWeight: '600',
    padding: '3px 8px',
    borderRadius: '5px',
    background: 'rgba(79, 168, 247, 0.14)',
    color: '#4FA8F7',
    letterSpacing: '0.03em'
  },
  subText: {
    fontSize: '12px',
    color: '#5C6377',
    marginTop: '4px'
  },
  bellButton: {
    position: 'relative',
    width: '34px',
    height: '34px',
    borderRadius: '9px',
    background: '#12151F',
    border: '1px solid rgba(255,255,255,0.07)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '18px',
    padding: 0
  },
  notificationDot: {
    position: 'absolute',
    top: '6px',
    right: '7px',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#F0A93E'
  },
  alertBanner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'linear-gradient(90deg, rgba(241,88,78,0.14), rgba(241,88,78,0.03))',
    border: '1px solid rgba(241,88,78,0.3)',
    borderRadius: '12px',
    padding: '13px 18px',
    marginBottom: '16px'
  },
  alertLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '13px'
  },
  btn: {
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: '12.5px',
    padding: '8px 14px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.07)',
    background: '#161A26',
    color: '#EDEFF4',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  btnPrimary: {
    background: 'linear-gradient(135deg, #8C7CFF, #5B4CD6)',
    border: 'none',
    fontWeight: '600'
  },
  row2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '14px',
    marginBottom: '14px'
  },
  panel: {
    background: '#12151F',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '14px',
    padding: '16px 18px'
  },
  panelHead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },
  panelTitle: {
    fontSize: '13px',
    fontWeight: '600'
  },
  panelSub: {
    fontSize: '11px',
    color: '#5C6377',
    marginTop: '2px'
  },
  link: {
    fontSize: '11.5px',
    color: '#8C7CFF',
    textDecoration: 'none',
    cursor: 'pointer'
  },
  kpiIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '9px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '12px',
    fontSize: '18px'
  },
  kpiLabel: {
    fontSize: '10.5px',
    color: '#8A90A3',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    marginBottom: '6px'
  },
  kpiValue: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '10px',
    fontFamily: "'IBM Plex Mono', monospace"
  },
  barTrack: {
    height: '8px',
    background: 'rgba(255,255,255,0.06)',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '6px'
  },
  barFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #4FA8F7, #8C7CFF)'
  },
  barCaption: {
    fontSize: '11px',
    color: '#5C6377',
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: "'IBM Plex Mono', monospace"
  },
  buttonGroup: {
    display: 'flex',
    gap: '8px'
  },
  topupForm: {
    marginTop: '12px',
    padding: '10px',
    background: 'rgba(255,255,255,0.02)',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.07)'
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    background: '#161A26',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '6px',
    color: '#EDEFF4',
    fontSize: '13px',
    fontFamily: "'IBM Plex Sans', sans-serif",
    boxSizing: 'border-box'
  },
  subStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#3FCB84'
  },
  statusPill: {
    fontSize: '10.5px',
    fontWeight: '600',
    padding: '3px 9px',
    borderRadius: '20px'
  },
  statusPillGreen: {
    background: 'rgba(63, 203, 132, 0.14)',
    color: '#3FCB84'
  },
  statusPillAmber: {
    background: 'rgba(240, 169, 62, 0.14)',
    color: '#F0A93E'
  },
  statusPillRed: {
    background: 'rgba(241, 88, 78, 0.14)',
    color: '#F1584E'
  },
  subActions: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px',
    flexWrap: 'wrap'
  },
  timeline: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    margin: '18px 4px 4px',
    paddingTop: '20px'
  },
  tStop: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    position: 'relative',
    fontSize: '10.5px',
    color: '#5C6377',
    width: '70px',
    textAlign: 'center'
  },
  tStopDone: {
    color: '#EDEFF4'
  },
  tStopActive: {
    color: '#EDEFF4'
  },
  tDot: {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    background: '#161A26',
    border: '2px solid rgba(255,255,255,0.07)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    color: '#fff'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '12.5px'
  },
  monospace: {
    fontFamily: "'IBM Plex Mono', monospace"
  },
  methodRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderTop: '1px solid rgba(255,255,255,0.04)',
    fontSize: '12.5px'
  },
  statusBadge: {
    fontSize: '11.5px',
    color: '#5C6377',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 0
  }
};

export default CustomerDashboard;
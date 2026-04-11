// ─── Certificate Component ───────────────────────────────────────────────────────
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, User, CheckCircle, Download, Share2 } from 'lucide-react';

export default function Certificate({ testName, score, completedAt, candidateName, testId }) {
  const certificateRef = useRef(null);

  const handleDownload = () => {
    // In a real implementation, you would use html2canvas or similar library
    // to convert the certificate to an image and download it
    const certificateData = {
      testName,
      score,
      completedAt,
      candidateName,
      testId
    };
    
    // For demo purposes, we'll create a simple text download
    const certificateText = `
CERTIFICATE OF COMPLETION

This is to certify that ${candidateName}
has successfully completed the ${testName}
with a score of ${score}%

Completed on: ${completedAt}
Test ID: ${testId}

Issued by HireUp - Skill Assessment Platform
    `;
    
    const blob = new Blob([certificateText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${testName.replace(/\s+/g, '_')}_Certificate.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareData = {
      title: `Certificate - ${testName}`,
      text: `I've successfully completed the ${testName} with a score of ${score}% on HireUp!`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert('Certificate link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-green/5 to-blue-500/5 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-display font-bold text-4xl text-text-primary mb-4">
            Your Certificate
          </h1>
          <p className="text-text-muted text-lg">
            Congratulations on completing your assessment!
          </p>
        </motion.div>

        <motion.div
          ref={certificateRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Certificate Header */}
          <div className="bg-gradient-to-r from-accent-green to-blue-500 p-8 text-white text-center">
            <div className="mb-4">
              <Award size={64} className="mx-auto opacity-90" />
            </div>
            <h2 className="font-display font-bold text-3xl mb-2">
              Certificate of Completion
            </h2>
            <p className="text-white/90">
              Issued by HireUp Skill Assessment Platform
            </p>
          </div>

          {/* Certificate Body */}
          <div className="p-12">
            <div className="text-center mb-8">
              <p className="text-lg text-text-muted mb-4">This is to certify that</p>
              <h3 className="font-display font-bold text-3xl text-text-primary mb-4">
                {candidateName}
              </h3>
              <p className="text-lg text-text-muted mb-6">has successfully completed</p>
              <h4 className="font-display font-bold text-2xl text-accent-green mb-6">
                {testName}
              </h4>
            </div>

            {/* Achievement Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-accent-green/10 rounded-xl">
                <CheckCircle size={32} className="mx-auto mb-2 text-accent-green" />
                <p className="font-display font-bold text-2xl text-accent-green">
                  {score}%
                </p>
                <p className="text-sm text-text-muted">Score Achieved</p>
              </div>
              
              <div className="text-center p-4 bg-blue-500/10 rounded-xl">
                <Calendar size={32} className="mx-auto mb-2 text-blue-500" />
                <p className="font-display font-bold text-lg text-blue-600">
                  {completedAt}
                </p>
                <p className="text-sm text-text-muted">Completion Date</p>
              </div>
              
              <div className="text-center p-4 bg-purple-500/10 rounded-xl">
                <User size={32} className="mx-auto mb-2 text-purple-500" />
                <p className="font-display font-bold text-lg text-purple-600">
                  Verified
                </p>
                <p className="text-sm text-text-muted">Credential ID</p>
              </div>
            </div>

            {/* Certificate Footer */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-text-muted mb-1">Issued by</p>
                  <p className="font-display font-semibold text-text-primary">
                    HireUp Platform
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-text-muted mb-1">Certificate ID</p>
                  <p className="font-mono text-sm text-text-primary">
                    HU-{testId}-{Date.now().toString().slice(-6)}
                  </p>
                </div>
              </div>
            </div>

            {/* Verification Note */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-sm text-text-muted">
                This certificate can be verified online at hireup.com/verify
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-accent-green text-white rounded-lg font-medium hover:bg-accent-green/90 transition-colors"
          >
            <Download size={20} />
            Download Certificate
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-bg-elevated border border-bg-border text-text-primary rounded-lg font-medium hover:bg-bg-border transition-colors"
          >
            <Share2 size={20} />
            Share Achievement
          </button>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-text-muted">
            This certificate demonstrates your expertise and commitment to professional development.
            Share it with employers and add it to your professional profiles.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

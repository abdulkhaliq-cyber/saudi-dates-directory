// AdSlot component - Placeholder for Google AdSense or other ad networks
// Replace the content with actual ad code once approved

interface AdSlotProps {
  position: 'top' | 'sidebar' | 'bottom' | 'inline';
}

export default function AdSlot({ position }: AdSlotProps) {
  // Different styling based on position
  const getStyles = () => {
    switch (position) {
      case 'top':
        return 'w-full h-24 bg-gray-100 border-2 border-dashed border-gray-300';
      case 'sidebar':
        return 'w-full h-96 bg-gray-100 border-2 border-dashed border-gray-300 sticky top-4';
      case 'bottom':
        return 'w-full h-24 bg-gray-100 border-2 border-dashed border-gray-300';
      case 'inline':
        return 'w-full h-32 bg-gray-100 border-2 border-dashed border-gray-300';
      default:
        return 'w-full h-24 bg-gray-100 border-2 border-dashed border-gray-300';
    }
  };

  return (
    <div className={`${getStyles()} rounded-lg flex items-center justify-center`}>
      <div className="text-center p-4">
        <p className="text-gray-500 font-medium text-sm">
          Advertisement - {position.charAt(0).toUpperCase() + position.slice(1)}
        </p>
        <p className="text-gray-400 text-xs mt-1">
          {/* Google AdSense slot here */}
          {/* Replace this div with: */}
          {/* <ins className="adsbygoogle" */}
          {/*      style="display:block" */}
          {/*      data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" */}
          {/*      data-ad-slot="XXXXXXXXXX" */}
          {/*      data-ad-format="auto"></ins> */}
        </p>
      </div>
    </div>
  );
}

// Example implementation when ready:
/*
export default function AdSlot({ position }: AdSlotProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className="ad-container">
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot="XXXXXXXXXX"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
}
*/

